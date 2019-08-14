package main

import (
    "fmt"
    "net"
)

func main() {
    conn, err := net.Dial("tcp", "localhost:1234")
    if err != nil {
        fmt.Printf("Dial error: %s\n", err)
        return
    }
    defer conn.Close()

    sendMsg := "Test Message.\n"
    conn.Write([]byte(sendMsg))
}
