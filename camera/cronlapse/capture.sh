#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H%M")
my_dir=`dirname $0`
raspistill -o $my_dir/img/$DATE.jpg -awb off -awbg 2.6,2.0