#!/bin/bash

protoc --proto_path=./ protocol.proto \
    --js_out=import_style=commonjs:html/javascript/src \
    #--grpc-web_out=import_style=commonjs,mode=grpcwebtext:html/javascript/src \
    --ts_out=service=true:html/javascript/src \
    --go_out=plugins=grpc:server/src/protocol

#何故かhtml/javascript/node_modulesに定義されていない関数が生成されるので置き換え
sed -i -e "s/jspb.Message.getFloatingPointFieldWithDefault/+jspb.Message.getFieldWithDefault/g" html/javascript/src/protocol_pb.js
