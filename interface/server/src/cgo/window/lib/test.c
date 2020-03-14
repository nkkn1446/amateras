#include "window.h"

int main() {
	int32_t x, y, screen;
	uint32_t width, height;
	x = y = screen = width = height = 0;

	context_t context = getwindowgeometry(windowactivate(search(window_new(), "Google Chrome")), &x, &y, &width, &height, &screen);
	window_free(context);
	context = window_new();
	window_free(mouseup(mousedown(mousemove(context, x + 160, y + 120), 1), 1));
	return 0;
}
