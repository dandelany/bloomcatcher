## camera

This section explains how to setup and configure your Raspberry Pi camera, and contains the code which runs on the device.

### Recommended initial Pi setup

1. Download latest Raspbian Lite .img file
2. Flash the image file to a MicroSD card (I use Balena Etcher for Mac, and a MicroSD -> USB adapter)
3. Go to the 'boot' volume (SD card) and create an empty file called 'ssh' in the root directory (`cd /Volumes/boot && touch ssh` on Mac/Linux)
4. Also in the 'boot' volume, create a file called "wpa_supplicant" and 
5. Safely remove the SD card from your computer & insert it in your Pi's MicroSD card slot
6. Connect a keyboard and a HDMI monitor to your Pi for first setup/camera test (optional)
7. Connect your Pi to a power supply and boot it up.
8. If you have a keyboard and monitor attached, you should see a login prompt, use the default login `pi` password `raspberry` to login. If you're operating with no monitor, you can SSH to the Pi from another computer by running `ssh pi@xx.xx.xx.xx` (with the Pi's IP address),

## Raspi-config

Once you have your Pi running and you have terminal access, either directly with a keyboard or via SSH, run the command `raspi-config` & set the following configuration options:

1. Go to Localisation Options and set your locale and timezone
2. Go to Interfacing Options > Camera and enable the camera interface
3. Go to Advanced Options > Expand Filesystem and make sure the filesystem is expanded
4. Finish and reboot your Pi.