import {grpc} from "@improbable-eng/grpc-web";
import {Interface} from "./protocol_pb_service";
import {Request} from "./protocol_pb";
import {Main} from "./js"

const isSSL = location.protocol === 'https:';
const host = (isSSL ? "https://" : "http://") + location.host + ":8081";

function protocolInterface(request: Request, callback: (reply: any) => void) {
  grpc.unary(Interface.Touch, {
    request: request,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      console.log("protocolInterface.onEnd.status", status, statusMessage);
      console.log("protocolInterface.onEnd.headers", headers);
      if (status === grpc.Code.OK && message) {
	callback(message);
      }
      console.log("protocolInterface.onEnd.trailers", trailers);
    }
  });
}

Main(protocolInterface);
