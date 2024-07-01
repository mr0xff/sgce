#!/bin/bash
DEVICE="/dev/ttyACM0"
BAUD="9600"
# Enviar dados
screen -dmS arduino_session $DEVICE $BAUD
screen -S arduino_session -p 0 -X stuff "open^M"
screen -S arduino_session -X quit