# amateras

## インストール

### momo

```
sudo apt install libsdl2-dev -y
```

### npm

```
sudo apt install npm -y
```

### go

```
sudo snap install go --classic
export GOPATH=$HOME/.go
export PATH=$PATH:$HOME/go/bin:$HOME/.go/bin
```

### protoc

```
sudo apt-get install autoconf automake libtool curl make g++ unzip git -y
git clone https://github.com/protocolbuffers/protobuf.git
cd protobuf
git submodule update --init --recursive
./autogen.sh
./configure
make
make check
sudo make install
sudo ldconfig
```

## ライセンス
Apache License 2.0

```
Copyright 2020, totsuan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
