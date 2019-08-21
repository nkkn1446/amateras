#!/bin/bash

###########################################################################
# fsc-window.sh - take screen video cast for selected window
#
#    Authors: Luo Zengbin <jalen.cn@gmail.com>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, version 3 of the License.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Usage:
#    $fsc-window.sh $1 第一引数に録画ビデオファイルの保存パスを指定する。
###########################################################################

####################################
# 奇数を偶数に変換する処理
####################################
function even_round {
    if [ `expr $1 % 2` == 0 ]; then
        echo $1
    else
        echo $(($1 - 1))
    fi
}

echo "録画対象Windowをカーソルで選択してください。"
VFILE=$1
INFO=$(xwininfo)

WIN_GEO=$(echo $INFO | grep -oEe 'geometry [0-9]+x[0-9]+' | grep -oEe '[0-9]+x[0-9]+')
WIN_XY=$(echo $INFO | grep -oEe 'Corners:\s+\+[0-9]+\+[0-9]+' | grep -oEe '[0-9]+\+[0-9]+' | sed -e 's/\+/,/' )

# Windowsの横サイズと縦サイズを偶数にする
WIN_GEO_X=$(echo $WIN_GEO | cut -d 'x' -f 1)
WIN_GEO_Y=$(echo $WIN_GEO | cut -d 'x' -f 2)

WIN_GEO="$(even_round $WIN_GEO_X)x$(even_round $WIN_GEO_Y)"

echo "画面サイズ：$WIN_GEO"
echo "画面位置  ：$WIN_XY"

# 録画開始
# audio loopback有効化
sudo modprobe snd-aloop
ffmpeg \
	-show_region 1 \
	-f x11grab \
	-framerate 25 \
	-video_size $WIN_GEO \
	-i :0.0+$WIN_XY \
	-f pulse -ac 2 -i "alsa_output.platform-snd_aloop.0.analog-stereo.monitor" \
	-pix_fmt yuv420p \
	-c:v libx264 \
	-b:v 500k \
	-c:a aac \
	-preset ultrafast \
	-f flv \
	rtmp://217.178.47.248/test/a
       #-dcodec copy -pix_fmt yuv420p -c:v libx264 -preset veryfast -qscale 1 -y $VFILE
