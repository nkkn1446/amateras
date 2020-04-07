#!/bin/bash

protoc --proto_path=./ protocol.proto \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --js_out=import_style=commonjs,binary:./html/javascript/ts/src \
    --ts_out=service=grpc-web:./html/javascript/ts/src \
    --go_out=plugins=grpc:./server/src/protocol
