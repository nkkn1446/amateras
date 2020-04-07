// package: Protocol
// file: protocol.proto

import * as jspb from "google-protobuf";

export class Request extends jspb.Message {
  clearPointsList(): void;
  getPointsList(): Array<Request.Point>;
  setPointsList(value: Array<Request.Point>): void;
  addPoints(value?: Request.Point, index?: number): Request.Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Request.AsObject;
  static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Request;
  static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
  export type AsObject = {
    pointsList: Array<Request.Point.AsObject>,
  }

  export class Point extends jspb.Message {
    getType(): Request.Point.TypeMap[keyof Request.Point.TypeMap];
    setType(value: Request.Point.TypeMap[keyof Request.Point.TypeMap]): void;

    getX(): number;
    setX(value: number): void;

    getY(): number;
    setY(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Point.AsObject;
    static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Point;
    static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
  }

  export namespace Point {
    export type AsObject = {
      type: Request.Point.TypeMap[keyof Request.Point.TypeMap],
      x: number,
      y: number,
    }

    export interface TypeMap {
      TOUCH: 0;
      MOVE: 1;
      END: 2;
    }

    export const Type: TypeMap;
  }
}

export class Reply extends jspb.Message {
  clearPointsList(): void;
  getPointsList(): Array<Reply.Point>;
  setPointsList(value: Array<Reply.Point>): void;
  addPoints(value?: Reply.Point, index?: number): Reply.Point;

  getStr(): string;
  setStr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reply.AsObject;
  static toObject(includeInstance: boolean, msg: Reply): Reply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Reply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reply;
  static deserializeBinaryFromReader(message: Reply, reader: jspb.BinaryReader): Reply;
}

export namespace Reply {
  export type AsObject = {
    pointsList: Array<Reply.Point.AsObject>,
    str: string,
  }

  export class Point extends jspb.Message {
    getType(): Reply.Point.TypeMap[keyof Reply.Point.TypeMap];
    setType(value: Reply.Point.TypeMap[keyof Reply.Point.TypeMap]): void;

    getX(): number;
    setX(value: number): void;

    getY(): number;
    setY(value: number): void;

    getStr(): string;
    setStr(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Point.AsObject;
    static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Point;
    static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
  }

  export namespace Point {
    export type AsObject = {
      type: Reply.Point.TypeMap[keyof Reply.Point.TypeMap],
      x: number,
      y: number,
      str: string,
    }

    export interface TypeMap {
      TOUCH: 0;
      MOVE: 1;
      END: 2;
    }

    export const Type: TypeMap;
  }
}

