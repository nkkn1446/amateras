#!/bin/bash

#protoc --proto_path=./ protocol.proto \
#    --js_out=import_style=commonjs:html/javascript/src \
#    #protocとgrpc-webのバージョン合わせないとエラーになる（？）
#    #--grpc-web_out=import_style=commonjs,mode=grpcwebtext:html/javascript/src \
#    --go_out=plugins=grpc:server/src/protocol

protoc --proto_path=./ protocol.proto \
    --js_out=import_style=commonjs:html/javascript/src \
    --go_out=plugins=grpc:server/src/protocol
