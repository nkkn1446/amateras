package main

import (
    "fmt"
    "net"
    "unicode/utf8"
    "time"
)

var conn [3]net.Conn
var i int

func main() {
	for i=0;i<3;i++ {
		conn[i], _ = net.Dial("tcp", "localhost:5037")
		defer conn[i].Close()

		sendMsg := "host:transport-any"
		sendMsg = fmt.Sprintf("%04x%s", utf8.RuneCountInString(sendMsg), sendMsg)
		fmt.Printf(sendMsg + "\n")
		_, err := conn[i].Write([]byte(sendMsg))
		if err != nil {
			fmt.Printf("host error: %s\n", err)
			return
		}
		sendMsg = "shell:input touchscreen tap 0 0"
		sendMsg = fmt.Sprintf("%04x%s", utf8.RuneCountInString(sendMsg), sendMsg)
		fmt.Printf(sendMsg + "\n")
		_, err = conn[i].Write([]byte(sendMsg))
		if err != nil {
			fmt.Printf("shell error: %s\n", err)
			return
		}
		time.Sleep(5 * time.Second);
	}
}
