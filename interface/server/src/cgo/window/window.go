package window

/*
#cgo LDFLAGS: -L./lib -lwindow -lX11 -lXtst -lXinerama -lxkbcommon -lm -lpthread
#include "lib/window.h"
*/
import "C"

type Context C.context_t

func Hoge() {
	C.window_hoge()
}

func Free(context Context) {
	C.window_free(C.context_t(context))
}

func MouseUp(context Context, button int) (Context) {
	return Context(C.mouseup(C.context_t(context), C.uint32_t(button)))
}

func MouseDown(context Context, button int) (Context) {
	return Context(C.mousedown(C.context_t(context), C.uint32_t(button)))
}

func MouseMove(context Context, x int, y int) (Context) {
	return Context(C.mousemove(C.context_t(context), C.int32_t(x), C.int32_t(y)))
}

func GetWindowGeometry(context Context) (Context, int, int, int, int, int) {
	var x C.int32_t
	var y C.int32_t
	var width C.uint32_t
	var height C.uint32_t
	var screen C.int32_t
	context = Context(C.getwindowgeometry(C.context_t(context), &x, &y, &width, &height, &screen))
	return context, int(x), int(y), int(width), int(height), int(screen)
}

func WindowActivate(context Context) (Context) {
	return Context(C.windowactivate(C.context_t(context)))
}

func Search(context Context, name string) (Context) {
	return Context(C.search(C.context_t(context), C.CString(name)))
}

func New() (Context) {
	return Context(C.window_new())
}
