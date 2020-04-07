#!/bin/bash

protoc \
    --proto_path=./../../ protocol.proto \
    --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:./ts" \
    --ts_out="service=grpc-web:./ts"
