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
	"strconv"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct{}

func (s *server) Touch(ctx context.Context, in *pb.Request) (*pb.Reply, error) {
	points := []*pb.Reply_Point{}
	for i := 0; i < len(in.Points); i++ {
		if in.Points[i].Type != 0 {
			// タッチ以外は無視
			continue
		}
		str := ""
		err := exec.Command("adb", "shell", "input", "touchscreen", "tap", strconv.Itoa(int(in.Points[i].X * 3.0)), strconv.Itoa(int(in.Points[i].Y * 3.0))).Run()
		if err != nil {
			str = err.Error()
		}
		point := pb.Reply_Point{
			Type: pb.Reply_Point_Type(in.Points[i].Type),
			X: in.Points[i].X * 3.0,
			Y: in.Points[i].Y * 3.0,
		        Str: str}
		points = append(points, &point)
	}
	return &pb.Reply{Points: points}, nil
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
