// package: Protocol
// file: protocol.proto

import * as protocol_pb from "./protocol_pb";
import {grpc} from "@improbable-eng/grpc-web";

type InterfaceTouch = {
  readonly methodName: string;
  readonly service: typeof Interface;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protocol_pb.Request;
  readonly responseType: typeof protocol_pb.Reply;
};

export class Interface {
  static readonly serviceName: string;
  static readonly Touch: InterfaceTouch;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class InterfaceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  touch(
    requestMessage: protocol_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protocol_pb.Reply|null) => void
  ): UnaryResponse;
  touch(
    requestMessage: protocol_pb.Request,
    callback: (error: ServiceError|null, responseMessage: protocol_pb.Reply|null) => void
  ): UnaryResponse;
}

