#!/bin/bash

mkdir -p ./_proto

protoc \
    --proto_path=./../../ protocol.proto \
    --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:./_proto" \
    --ts_out="service=grpc-web:./_proto"
