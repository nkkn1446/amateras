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
	"./cgo/window"
	"log"
	"net"
	"fmt"
	"time"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct{}
var wcontext window.Context
var wx int
var wy int

func (s *server) Touch(ctx context.Context, in *pb.Request) (*pb.Reply, error) {
	points := []*pb.Reply_Point{}

	var str string
	start := time.Now();
	for i := 0; i < len(in.Points); i++ {
		// 座標移動
		if in.Points[i].Type == pb.Request_Point_Touch ||
		in.Points[i].Type == pb.Request_Point_Move {
			wcontext = window.MouseMove(wcontext, wx + int(in.Points[i].X * 2.0), wy + int(in.Points[i].Y * 2.0))
		}
		// タップ
		if in.Points[i].Type == pb.Request_Point_Touch {
			wcontext = window.MouseDown(wcontext, 1)
		}
		// リリース
		if in.Points[i].Type == pb.Request_Point_End {
			wcontext = window.MouseUp(wcontext, 1)
		}

		point := pb.Reply_Point{
			Type: pb.Reply_Point_Type(in.Points[i].Type),
			X: in.Points[i].X,
			Y: in.Points[i].Y,
			Str: ""}
			points = append(points, &point)
	}

	str = fmt.Sprintf("%f", time.Now().Sub(start).Seconds());

	return &pb.Reply{Points: points, Str: str}, nil
}

func main() {
	wcontext, wx, wy, _, _, _ = window.GetWindowGeometry(window.WindowActivate(window.Search(window.New(), "Android")))

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
	window.Free(wcontext)
}
