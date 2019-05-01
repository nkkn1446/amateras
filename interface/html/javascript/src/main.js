var $ = require('jquery');

const {TouchRequest} = require('./protocol_pb.js');
const {InterfaceClient} = require('./protocol_grpc_web_pb.js');

var request = new TouchRequest();
request.setX(0.0);
request.setY(0.0);

var client = new InterfaceClient('http://3.95.132.0:8080', {}, {});
client.touch(request, {}, (err, response) => {
  console.log(response.getX() + " " + response.getY());
});

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
