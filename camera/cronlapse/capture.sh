#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H%M")
raspistill -o ./img/$DATE.jpg -awb off -awbg 2.6,2.0