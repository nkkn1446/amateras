#!/bin/bash

sudo chmod 777 /dev/kvm
DISPLAY=:0 ${HOME}/Android/Sdk/emulator/emulator -avd Pixel_2_API_28
