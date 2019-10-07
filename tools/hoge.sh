#!/bin/bash

INFO=$(xwininfo)

WIN_GEO=$(echo $INFO | grep -oEe 'geometry [0-9]+x[0-9]+' | grep -oEe '[0-9]+x[0-9]+')

echo $WIN_GEO
