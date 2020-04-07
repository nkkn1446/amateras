// package: Protocol
// file: protocol.proto

var protocol_pb = require("./protocol_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Interface = (function () {
  function Interface() {}
  Interface.serviceName = "Protocol.Interface";
  return Interface;
}());

Interface.Touch = {
  methodName: "Touch",
  service: Interface,
  requestStream: false,
  responseStream: false,
  requestType: protocol_pb.Request,
  responseType: protocol_pb.Reply
};

exports.Interface = Interface;

function InterfaceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

InterfaceClient.prototype.touch = function touch(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Interface.Touch, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.InterfaceClient = InterfaceClient;

