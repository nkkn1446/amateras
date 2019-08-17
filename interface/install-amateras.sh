#!/bin/bash

#sudo apt-get install autoconf automake libtool curl make g++ unzip apache2 -y
#git clone https://github.com/protocolbuffers/protobuf.git

#cd protobuf
#git submodule update --init --recursive
#./autogen.sh
#./configure
#make -j2
#make -j2 check
#sudo make -j2 install
#sudo ldconfig

#echo "#!/bin/bash\nexport GOROOT=$HOME/go\nexport GOPATH=$HOME/.go\nexport PATH=$PATH:$HOME/go/bin:$HOME/.go/bin">~/.bash_profile
#wget https://dl.google.com/go/go1.11.9.linux-amd64.tar.gz
#wget https://dl.google.com/go/go1.11.12.linux-arm64.tar.gz
#tar xvf go*.tar.gz
#cp -R go ~/go1.4
#cd go/src
# run.bash 48行目をコメントアウト？
#./all.bash
#cd ../..
#mv go ~/go
#rm -fr ~/go1.4
#go get -u google.golang.org/grpc

#sudo apt install -y nodejs npm
#sudo npm install n -g
#sudo n stable
#sudo apt purge -y nodejs npm
#exec $SHELL -l

#sudo npm install -g create-react-app
#sudo npm install -g @types/google-protobuf

#git clone https://github.com/golang/protobuf.git ~/.go/src/protobuf
#go get github.com/golang/protobuf/proto
#cd ~/.go/src/protobuf
#make -j2

#aarch64
#sudo apt install docker-compose -y

#x86-x64
#wget "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -O docker-compose
#sudo mv docker-compose /usr/local/bin/
#sudo chmod +x /usr/local/bin/docker-compose
#sudo apt install docker.io -y

#git clone https://github.com/grpc/grpc-web

#cd grpc-web
#git checkout 5852e276e096795a363dd65312b971393655618d
#sudo apt-get install libprotoc-dev
#sudo make -j2 install-plugin

#https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld
#cd net/grpc/gateway/examples/helloworld/
#sudo docker build -t helloworld/envoy -f ./envoy.Dockerfile .
#sudo docker run -d -p 8080:8080 -p 9901:9901 --network=host helloworld/envoy

#curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
#echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
#sudo apt-get update && sudo apt-get install yarn

#git clone https://github.com/otanu/hello-grpc-web.git

#cd hello-grpc-web/client
#sudo yarn add grpc-web
#sudo yarn add @types/google-protobuf

#sed -i -e 's/localhost/xxx.xxx.xxx.xxx/g' src/App.tsx
#typescriptフラグ変更

#cd ../server
#go get -u github.com/golang/protobuf/proto

#cd ../
#./gen.sh
#sudo docker-compose up --build -d server proxy

#必要に応じて実行
#go get -u github.com/golang/protobuf/protoc-gen-go
#go get -u github.com/pilu/fresh
