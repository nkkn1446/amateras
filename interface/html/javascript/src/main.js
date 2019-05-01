var $ = require('jquery');

const {TouchRequest} = require('./protocol_pb.js');
const {InterfaceClient} = require('./protocol_grpc_web_pb.js');

$( function() {
  var bitmovinPlayer = bitmovin.player("bitmovin_player_wrapper");
  var conf = {
    key: "42a79aff-21a7-47f6-a010-e408df58c96c",
    source: {
      hls: "http://202.210.168.42:8081/kbn/test/a/playlist.m3u8",
      progressive: "http://202.210.168.42:8081/kbn/test/a/playlist.m3u8"
    },
    playback: {
      autoplay: true,
      muted: false
    },
    style: {
      width: '640px',
      height: '360px'
    },
    events: {
      onError: function(data) {
        if (typeof console == "object") {
          console.log("bitmovin error: " + data.code + ": " + data.message);
        }
      }
    }
  };
  bitmovinPlayer.setup(conf);
} );

var ac = document.getElementById("bitmovin_player_wrapper"); // canvas要素のオブジェクトを取得
ac.ontouchstart = function (e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    var t = e.touches[0];       // 触れている指に関する情報を取得

    var request = new TouchRequest();
    request.setX(t.pageX);
    request.setY(t.pageY);

    var client = new InterfaceClient('http://3.95.155.208:8080', {}, {});
    client.touch(request, {}, (err, response) => {
    var s = "";             // 変数sを初期化
    s += "x=" + response.getX() + ",";
    s += "y=" + response.getY() + "<br>";
    document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示
});
};
