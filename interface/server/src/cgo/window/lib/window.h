#ifndef _WINDOW_H
#define _WINDOW_H

#include "xdo/xdo.h"
#include <stdint.h>

typedef struct context {
  xdo_t *xdo;
  Window *windows;

  /* Last known mouse position */
  int last_mouse_x;
  int last_mouse_y;
  int last_mouse_screen;
  int have_last_mouse;
} context_t;

context_t window_new();
void window_free(context_t context);
context_t search(context_t context, const char *window_name);
context_t getwindowgeometry(context_t context, int32_t *ret_x, int32_t *ret_y, uint32_t *ret_width, uint32_t *ret_height, int32_t *ret_screen);
context_t windowactivate(context_t context);
context_t mousemove(context_t context, int32_t x, int32_t y);
context_t mousedown(context_t context, uint32_t button);
context_t mouseup(context_t context, uint32_t button);

#endif
