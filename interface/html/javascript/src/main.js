var $ = require('jquery');

const {Request} = require('./protocol_pb.js');
const {InterfaceClient} = require('./protocol_grpc_web_pb.js');

var ac = document.getElementById("video_tag_id"); // canvas要素のオブジェクトを取得
var touches = [];
// 画面に指が触れたときの処理を定義
ac.addEventListener("touchstart", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    touches = e.changedTouches;
});
var moves = [];
ac.addEventListener("touchmove", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    moves = e.changedTouches;
});
var ends = [];
ac.addEventListener("touchend", function(e) {
    // 指が離れているのでイベントのキャンセルは不要
    // e.preventDefault();     // デフォルトイベントをキャンセル
    ends = e.changedTouches;
});

var maxDelay = 16;
(function loop(delay){
   setTimeout(function() {
        if (touches.length <= 0 &&
	    moves.length <= 0 &&
	    ends.length <= 0)
	{
	    loop(maxDelay);
	    return;
	}
	var startTime = Date.now();

	var points = [];
	for (var i = 0; i < touches.length; ++i) {
	    var t = touches[i];

	    var point = new Request.Point();
	    point.setType(Request.Point.Type.TOUCH);
	    point.setX(t.pageX);
	    point.setY(t.pageY);
	    points[points.length] = point;
	}
	for (var i = 0; i < moves.length; ++i) {
	    var t = moves[i];

	    var point = new Request.Point();
	    point.setType(Request.Point.Type.MOVE);
	    point.setX(t.pageX);
	    point.setY(t.pageY);
	    points[points.length] = point;
	}
	for (var i = 0; i < ends.length; ++i) {
	    var t = ends[i];

	    var point = new Request.Point();
	    point.setType(Request.Point.Type.END);
	    point.setX(t.pageX);
	    point.setY(t.pageY);
	    points[points.length] = point;
	}
        var request = new Request();
        request.setPointsList(points);
    
        var client = new InterfaceClient('http://192.168.0.105:8080', {}, {});
        client.touch(request, {}, (err, reply) => {
            var s = "";             // 変数sを初期化
	    var points = reply.getPointsList();
	    var typeList = {0:"touch",1:"move",2:"end"};
	    for (var i = 0; i < points.length; ++i) {
		s += "type=" + typeList[points[i].getType()] + ",";
                s += "x=" + points[i].getX() + ",";
                s += "y=" + points[i].getY() + ",";
                s += "str=" + points[i].getStr() + "<br>";
	    }
	    document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示
	});
        for (var i = 0; i < touches.length; ++i) {
            delete touches[i];
        }
        touches = [];
        for (var i = 0; i < moves.length; ++i) {
            delete moves[i];
        }
        moves = [];
        for (var i = 0; i < ends.length; ++i) {
            delete ends[i];
        }
        ends = [];

	// 処理時間を加味して遅延させる
	var nextDelay = Math.max(maxDelay - (Date.now() - startTime), 0);
	loop(nextDelay);
    }, delay);
})(maxDelay);
