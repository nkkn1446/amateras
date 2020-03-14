#!/bin/bash

sudo snap install go
sudo apt install ninja-build libx11-dev libxtst-dev libxinerama-dev libxkbcommon-dev

go get -u google.golang.org/grpc
go get -u github.com/golang/protobuf/proto

git clone https://github.com/golang/protobuf.git ~/.go/src/protobuf
cd ~/.go/src/protobuf
make -j2
