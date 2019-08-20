var $ = require('jquery');

const {Request} = require('./protocol_pb.js');
const {InterfaceClient} = require('./protocol_grpc_web_pb.js');

function getPoint(t, clientRect) {
    // 画面のタッチ位置を取得
    var touchX = t.pageX;
    var touchY = t.pageY;

    // 要素の位置を取得
    var positionX = clientRect.left + window.pageXOffset;
    var positionY = clientRect.top + window.pageYOffset;

    // 要素内におけるタッチ位置を計算
    var x = touchX - positionX;
    var y = touchY - positionY;
    return {X:x,Y:y};
}

var ac = document.getElementById("video_tag_id"); // canvas要素のオブジェクトを取得
var touches = [];
// 画面に指が触れたときの処理を定義
ac.addEventListener("touchstart", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        touches[touches.length] = getPoint(e.changedTouches[i], clientRect);
    }
});
var moves = [];
ac.addEventListener("touchmove", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        moves[moves.length] = getPoint(e.changedTouches[i], clientRect);
    }
});
var ends = [];
ac.addEventListener("touchend", function(e) {
    // 指が離れているのでイベントのキャンセルは不要
    // e.preventDefault();     // デフォルトイベントをキャンセル
    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        ends[ends.length] = getPoint(e.changedTouches[i], clientRect);
    }
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
	    point.setX(t.X);
	    point.setY(t.Y);
	    points[points.length] = point;
	}
	for (var i = 0; i < moves.length; ++i) {
	    var t = moves[i];

	    var point = new Request.Point();
	    point.setType(Request.Point.Type.MOVE);
	    point.setX(t.X);
	    point.setY(t.Y);
	    points[points.length] = point;
	}
	for (var i = 0; i < ends.length; ++i) {
	    var t = ends[i];

	    var point = new Request.Point();
	    point.setType(Request.Point.Type.END);
	    point.setX(t.X);
	    point.setY(t.Y);
	    points[points.length] = point;
	}
        var request = new Request();
        request.setPointsList(points);
    
        var client = new InterfaceClient('http://192.168.0.106:8080', {}, {});
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
