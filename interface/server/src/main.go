/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package main

import (
	pb "./protocol"
	"log"
	"net"
	"os/exec"
	"fmt"
	"time"
	"bytes"
	"strings"

	"encoding/binary"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct{}

type Event struct {
  Timeval uint64
  Typo uint16
  Code uint16
  Value uint32
}

func AppendEvent(buf *bytes.Buffer, typo uint16, code uint16, value uint32) {
	e := Event{}
	e.Typo = typo
	e.Code = code
	e.Value = value
	binary.Write(buf, binary.LittleEndian, &e)
}

func (s *server) Touch(ctx context.Context, in *pb.Request) (*pb.Reply, error) {
	points := []*pb.Reply_Point{}
	command := make([]byte, 0, 4096)
	command = append(command, "\""...)
	for i := 0; i < len(in.Points); i++ {
		buf := bytes.NewBuffer(make([]byte, 0, 16 * 6))

		// タップ
		if in.Points[i].Type == pb.Request_Point_Touch {
			AppendEvent(buf, 3, 57, 0)
			AppendEvent(buf, 3, 48, 0)
			AppendEvent(buf, 3, 58, 129)
		}
		// 座標移動
		if in.Points[i].Type == pb.Request_Point_Touch ||
		   in.Points[i].Type == pb.Request_Point_Move {
			// 縦横は画面回転前に準拠
			AppendEvent(buf, 3, 53, uint32((360 - in.Points[i].Y) / 360.0 * 32767.0))
			AppendEvent(buf, 3, 54, uint32(in.Points[i].X / 640.0 * 32767.0))
		}
		// リリース
		if in.Points[i].Type == pb.Request_Point_End {
			AppendEvent(buf, 3, 58, 0)
			AppendEvent(buf, 3, 57, 4294967295)
		}
		// 終了
		AppendEvent(buf, 0, 0, 0)

		for i := 0; i < len(buf.Bytes()); i++ {
			command = append(command, fmt.Sprintf("\\x%02x", uint8(buf.Bytes()[i]))...)
		}

		point := pb.Reply_Point{
			Type: pb.Reply_Point_Type(in.Points[i].Type),
			X: in.Points[i].X * 3.0,
			Y: in.Points[i].Y * 3.0,
		        Str: ""}
		points = append(points, &point)
	}

	command = append(command, "\" > /dev/input/event1"...)

	var str string
	start := time.Now();
	cmd := exec.Command("adb", "shell", "print", "-n", string(command))
	cmd.Stdin = strings.NewReader(str)
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		str = err.Error()
	} else if out.String() != "" {
		str = out.String()
	} else {
		str = fmt.Sprintf("%f", time.Now().Sub(start).Seconds());
	}

	return &pb.Reply{Points: points, Str: str}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterInterfaceServer(s, &server{})
	// Register reflection service on gRPC server.
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
