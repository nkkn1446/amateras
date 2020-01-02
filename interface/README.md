# フロントエンドとAndroid Emulatorのプロキシ部分

## html(フロントエンド)

* TypeScript
* grpc-web
* WebRTC
* apache2（html以下を差し替え）

## Proxy

* docker
* grpc

## Server

* golang
* grpc

# ビルド

## TypeScript

```
cd html/javascript
./build
```

## proxy

```
cd proxy
./build
```

## golang

```
cd server
./build
```

## grpc IDL更新

```
// protocol.protoを編集
sh gen.sh
```

# 実行方法

```
./stop
./run
```

# ディレクトリ構成

```
.
├── README.md
├── gen.sh・・・grpcインタフェースの生成シェル
├── html
│   ├── index.html
│   └── javascript
│       ├── a.js
│       ├── build
│       ├── node_modules
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       └── webrtc.js
├── install-amateras.sh・・・関連ファイルのインストールシェル
├── protocol.proto・・・grpc IDLファイル
├── proxy
│   ├── build
│   ├── envoy.Dockerfile
│   ├── envoy.yaml
│   ├── run
│   └── stop
├── run
├── server
│   ├── a.out
│   ├── build
│   ├── run
│   ├── src
│   │   ├── main.go
│   │   └── protocol・・・grpcインターフェース
│   └── stop
└── stop
```
