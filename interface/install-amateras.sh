#!/bin/bash

#
# node install
#

npm install

#
# protobuf install
#

sudo apt-get install autoconf automake libtool curl make g++ unzip git -y
git clone https://github.com/protocolbuffers/protobuf.git
cd protobuf
git submodule update --init --recursive
./autogen.sh
./configure
make -j2
make check
sudo make -j2 install
sudo ldconfig
# server
snap install go
echo "#!/bin/bash\nexport GOROOT=$HOME/go\nexport GOPATH=$HOME/.go\nexport PATH=$PATH:$HOME/go/bin:$HOME/.go/bin">~/.bash_profile
go get -u github.com/golang/protobuf/protoc-gen-go
# html
#git clone https://github.com/grpc/grpc-web
#cd grpc-web
#git checkout refs/tags/1.0.4
#sudo apt-get install libprotoc-dev
#sudo make -j2 install-plugin

sh ./server/install.sh
sh ./html/javascript/install.sh
