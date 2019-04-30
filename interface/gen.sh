#!/bin/bash

protoc --proto_path=./ protocol.proto \
    --js_out=import_style=commonjs:html/javascript/src \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:html/javascript/src \
    --go_out=plugins=grpc:server/src/protocol
