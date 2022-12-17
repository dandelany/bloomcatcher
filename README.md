## Warning: This project is currenrly under active development and should not be used in its current unstable state unless you know what you're doing!

# bloomcatcher
A collection of tools for building and operating a fleet of Raspberry Pi timelapse cameras. 

<img src="https://raw.githubusercontent.com/dandelany/bloomcatcher/master/assets/flowers.jpg" width="100%" />

## Concept of Operations

This is a set of tools which allow you to set up a high quality remotely-operated timelapse camera (or multiple), 
using relatively inexpensive parts - namely a Raspberry Pi/Pi Zero W and a Raspberry Pi HQ Camera module. The general
concept is as follows:

#### Setup
* Buy a Wifi-capable Raspberry Pi, HQ camera, lens and USB battery/power bank (details in `/hardware` section)
* Build or buy an enclosure for the components
* Assemble the Pi, camera and lens inside its enclosure.
* Set up the Pi by flashing a SD card with the normal Raspberry Pi OS, 
* Connect the Pi to Wifi and configure SSH access
* Install Ansible on your computer, which is on the same Wifi network as your Pi
* Use the included Ansible scripts to configure & install the timelapse software on your camera(s)

#### Shooting timelapse photos
* Power your Pi camera with a USB power bank (battery) and place it in the location you want to photograph
* The timelapse software will use the camera to automatically take a photo every minute
* 