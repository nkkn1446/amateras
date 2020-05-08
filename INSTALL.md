# インストール

## momo

```
sudo apt install libsdl2-dev -y
```

## npm

```
sudo apt install npm -y
```

## go

```
sudo snap install go --classic
export GOPATH=$HOME/.go
export PATH=$PATH:$HOME/go/bin:$HOME/.go/bin
```

## protoc

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

