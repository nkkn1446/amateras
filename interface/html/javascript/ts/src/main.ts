import {grpc} from "@improbable-eng/grpc-web";
import {Interface} from "./protocol_pb_service";
import {Request} from "./protocol_pb";
import {Main} from "./js"

declare const USE_TLS: boolean;
const host = USE_TLS ? "https://jitaku.amateras.ga:8080" : "http://jitaku.amateras.ga:8080";

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
