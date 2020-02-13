#include "window.h"
#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <math.h>

context_t window_new() {
  context_t context;
  context.xdo = xdo_new(NULL);
  context.windows = NULL;
  context.last_mouse_x = 0;
  context.last_mouse_y = 0;
  context.last_mouse_screen = 0;
  context.have_last_mouse = 0;
  return context;
}

void window_free(context_t context) {
  xdo_free(context.xdo);
  if (context.windows != NULL) {
    free(context.windows);
  }
}

void window_hoge() {
	window_free(window_new());
}


context_t search(context_t context, const char *window_name) {
  Window *list = NULL;
  xdo_search_t search;
  unsigned int nwindows;

  memset(&search, 0, sizeof(xdo_search_t));
  search.max_depth = -1;
  search.require = SEARCH_ANY;
  search.searchmask |= SEARCH_NAME;
  search.winname = window_name;
  search.searchmask |= SEARCH_CLASS;
  search.winclass = window_name;
  search.searchmask |= SEARCH_CLASSNAME;
  search.winclassname = window_name;

  xdo_search_windows(context.xdo, &search, &list, &nwindows);

  /* Free old list as it's malloc'd by xdo_search_windows */
  if (context.windows != NULL) {
    free(context.windows);
  }
  context.windows = list;

  printf("%u\n", (uint32_t)*context.windows);
  
  return context;
}

context_t getwindowgeometry(context_t context, int32_t *ret_x, int32_t *ret_y, uint32_t *ret_width, uint32_t *ret_height, int32_t *ret_screen) {
  int x, y;
  Screen *screen;
  unsigned int width, height;

  Window window = *context.windows;
  int ret = 0;
  ret = xdo_get_window_size(context.xdo, window, &width, &height);
  if (ret != XDO_SUCCESS) {
	  fprintf(stderr, "window %ld - failed to get height/width?\n", window);
  }

  ret = xdo_get_window_location(context.xdo, window, &x, &y, &screen);
  if (ret != XDO_SUCCESS) {
	  fprintf(stderr, "window %ld - failed to get location?\n", window);
  }

  printf("%d\n", x);
  printf("%d\n", y);
  printf("%u\n", width);
  printf("%u\n", height);
  printf("%d\n", XScreenNumberOfScreen(screen));

  *ret_x = x;
  *ret_y = y;
  *ret_width = width;
  *ret_height = height;
  *ret_screen = XScreenNumberOfScreen(screen);

  return context;
}

context_t windowactivate(context_t context) {

  Window window = *context.windows;
  int ret = 0;
  ret = xdo_activate_window(context.xdo, window);
  if (ret) {
	  fprintf(stderr, "xdo_activate_window on window:%ld reported an error\n",
			  window);
  }

  return context;
}

context_t mousemove(context_t context, int32_t x, int32_t y) {
  struct mousemove {
    Window window;
    int clear_modifiers;
    int opsync;
    int polar_coordinates;
    int x;
    int y;
    int screen;
    useconds_t delay;
    int step;
  };
  struct mousemove mousemove;
  mousemove.clear_modifiers = 0;
  mousemove.polar_coordinates = 0;
  mousemove.opsync = 0;
  mousemove.screen = DefaultScreen(context.xdo->xdpy);
  mousemove.x = x;
  mousemove.y = y;
  mousemove.step = 0;
  mousemove.window = 0;

  int ret;
  charcodemap_t *active_mods = NULL;
  int active_mods_n;

  int screen = mousemove.screen;
  Window window = mousemove.window;

  /* Save the mouse position if the window is CURRENTWINDOW */
  if (window == CURRENTWINDOW) {
	  context.have_last_mouse = True;
	  xdo_get_mouse_location(context.xdo, &(context.last_mouse_x),
			  &(context.last_mouse_y), &(context.last_mouse_screen));
  }

  if (mousemove.polar_coordinates) {
	  /* x becomes angle (degrees), y becomes distance.
	   * XXX: Origin should be center (of window or screen)
	   */
	  int origin_x, origin_y;
	  if (mousemove.window != CURRENTWINDOW) {
		  int win_x, win_y;
		  unsigned int win_w, win_h;
		  xdo_get_window_location(context.xdo, window, &win_x, &win_y, NULL);
		  xdo_get_window_size(context.xdo, window, &win_w, &win_h);
		  origin_x = win_x + (win_w / 2);
		  origin_y = win_y + (win_h / 2);
	  } else { /* no window selected, move relative to screen */
		  Screen *s = ScreenOfDisplay(context.xdo->xdpy, screen);
		  origin_x = s->width / 2;
		  origin_y = s->height / 2;
	  }

	  /* The original request for polar support was that '0' degrees is up
	   * and that rotation was clockwise, so 0 is up, 90 right, 180 down, 270
	   * left. This conversion can be done with (360 - degrees) + 90 */
	  //double radians = (x * M_PI / 180);
	  double radians = ((360 - x) + 90) * M_PI / 180;
	  double distance = y;
	  x = origin_x + (cos(radians) * distance);

	  /* Negative sin, since screen Y coordinates are descending, where cartesian
	   * is ascending */
	  y = origin_y + (-sin(radians) * distance);
  }

  int mx, my, mscreen;
  xdo_get_mouse_location(context.xdo, &mx, &my, &mscreen);


  if (mousemove.clear_modifiers) {
	  xdo_get_active_modifiers(context.xdo, &active_mods, &active_mods_n);
	  xdo_clear_active_modifiers(context.xdo, window, active_mods, active_mods_n);
  }

  if (mousemove.step == 0) {
	  if (window != CURRENTWINDOW && !mousemove.polar_coordinates) {
		  ret = xdo_move_mouse_relative_to_window(context.xdo, window, x, y);
	  } else {
		  ret = xdo_move_mouse(context.xdo, x, y, screen);
	  }
  } else {
	  if (mx == x && my == y && mscreen == screen) {
		  /* Nothing to move. Quit now. */
		  return context;
	  }

	  fprintf(stderr, "--step support not yet implemented\n");

	  if (window > 0) {
		  ret = xdo_move_mouse_relative_to_window(context.xdo, window, x, y);
	  } else {
		  ret = xdo_move_mouse(context.xdo, x, y, screen);
	  }
  }

  if (ret) {
	  fprintf(stderr, "xdo_move_mouse reported an error\n");
  } else {
	  if (mousemove.opsync) {
		  /* Wait until the mouse moves away from its current position */
		  xdo_wait_for_mouse_move_from(context.xdo, mx, my);
	  }
  }

  if (mousemove.clear_modifiers) {
	  xdo_set_active_modifiers(context.xdo, window, active_mods, active_mods_n);
	  free(active_mods);
  }

  return context;
}

context_t mousedown(context_t context, uint32_t button) {
  Window window = 0;
  int ret = 0;
  ret = xdo_mouse_down(context.xdo, window, button);

  if (ret) {
    fprintf(stderr, "xdo_mouse_down reported an error on window %ld\n", window);
  }

  return context;
}

context_t mouseup(context_t context, uint32_t button) {
  Window window = 0;
  int ret = 0;
  ret = xdo_mouse_up(context.xdo, window, button);

  if (ret) {
    fprintf(stderr, "xdo_mouse_down reported an error on window %ld\n", window);
  }

  return context;
}
