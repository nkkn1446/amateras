const {Request} = require('./protocol_pb.js');

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

var ac = document.getElementById("remote_video"); // canvas要素のオブジェクトを取得
// 画面に指が触れたときの処理を定義
var touches = [];
function cleanTouches() {
    for (var i = 0; i < touches.length; ++i) {
    	delete touches[i];
    }
    touches = [];
}
var mouseDragging = false;
ac.addEventListener("mousedown", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    cleanTouches();
    touches[touches.length] = getPoint(e, this.getBoundingClientRect());
    mouseDragging = true;
});
ac.addEventListener("touchstart", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    cleanTouches();

    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        touches[touches.length] = getPoint(e.changedTouches[i], clientRect);
    }
});
var moves = [];
function cleanMoves() {
    for (var i = 0; i < moves.length; ++i) {
        delete moves[i];
    }
    moves = [];
}
ac.addEventListener("mousemove", function(e) {
    if (mouseDragging == false) {
    	return;
    }
    e.preventDefault();     // デフォルトイベントをキャンセル
    cleanMoves();
    moves[moves.length] = getPoint(e, this.getBoundingClientRect());
});
ac.addEventListener("touchmove", function(e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    cleanMoves();

    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        moves[moves.length] = getPoint(e.changedTouches[i], clientRect);
    }
});
var ends = [];
function cleanEnds() {
    for (var i = 0; i < ends.length; ++i) {
        delete ends[i];
    }
    ends = [];
}
ac.addEventListener("mouseleave", function(e) {
    if (mouseDragging == false) {
	return;
    }
    // 画面外にドラッグした場合はmouseup扱いする
    e.preventDefault();     // デフォルトイベントをキャンセル
    cleanEnds();
    ends[ends.length] = getPoint(e, this.getBoundingClientRect());
    mouseDragging = false;
});
ac.addEventListener("mouseup", function(e) {
    // 指が離れているのでイベントのキャンセルは不要
    // e.preventDefault();     // デフォルトイベントをキャンセル
    cleanEnds();
    ends[ends.length] = getPoint(e, this.getBoundingClientRect());
    mouseDragging = false;
});
ac.addEventListener("touchend", function(e) {
    // 指が離れているのでイベントのキャンセルは不要
    // e.preventDefault();     // デフォルトイベントをキャンセル
    cleanEnds();

    var clientRect = this.getBoundingClientRect();
    for (var i = 0; i < e.changedTouches.length; ++i) {
        ends[ends.length] = getPoint(e.changedTouches[i], clientRect);
    }
});

export function Main(protocolInterface) {
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
        
    	let promise = new Promise((resolve, reject) => {
		protocolInterface(request, (reply) => {
            	    var s = "";
    		    if (reply.getStr() != "") {
    		       s = reply.getStr() + "<br>";
    		    }
    		    var points = reply.getPointsList();
    		    var typeList = {0:"touch",1:"move",2:"end"};
    		    for (var i = 0; i < points.length; ++i) {
    			s += "type=" + typeList[points[i].getType()] + ",";
            	        s += "x=" + points[i].getX() + ",";
            	        s += "y=" + points[i].getY() + ",";
            	        s += "str=" + points[i].getStr() + "<br>";
    			console.log(typeList[points[i].getType()]);
    		    }
    		    document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示
    		    resolve();
    		});
    	});
    	promise.then(function() {
    		cleanTouches();
    		cleanMoves();
    		cleanEnds();
    
    		// 処理時間を加味して遅延させる
    		var nextDelay = Math.max(maxDelay - (Date.now() - startTime), 0);
    		loop(nextDelay);
    	});
        }, delay);
    })(maxDelay);
}
