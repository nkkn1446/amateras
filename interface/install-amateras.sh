#!/bin/bash

#
# momo install
#
#sudo apt install libsdl2-dev -y

#
# node install
#
#sudo apt install npm
#npm install

#
# protobuf install
#
#sudo apt-get install autoconf automake libtool curl make g++ unzip git -y
#git clone https://github.com/protocolbuffers/protobuf.git
#cd protobuf
#git submodule update --init --recursive
#./autogen.sh
#./configure
#make -j2
#make check
#sudo make -j2 install
#sudo ldconfig
# server
#sudo snap install go
#echo "#!/bin/bash\nexport GOPATH=$HOME/.go\nexport PATH=$PATH:$HOME/go/bin:$HOME/.go/bin">~/.bash_profile
#go get -u github.com/golang/protobuf/protoc-gen-go
# proxy
#go get -u github.com/golang/dep/cmd/dep
#git clone https://github.com/improbable-eng/grpc-web.git $GOPATH/src/github.com/improbable-eng/grpc-web
#cd $GOPATH/src/github.com/improbable-eng/grpc-web
#dep ensure # after installing dep
#go install ./go/grpcwebproxy

#sh ./server/install.sh
#sh ./html/javascript/ts/install.sh
