#!/bin/bash

grpcwebproxy --backend_addr=localhost:9090 --run_tls_server=false --allow_all_origins