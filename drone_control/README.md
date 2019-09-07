# DroneProject

### Setup instructions
Create Access Point from Laptop using External WiFi adapter by going to `Settings > Mobile Hotspot > On`
* SSID: network
* Pass: netpass

##### First Time Setup for leader drones
* Verify serial number with mobile Tello app (important, or else commands don't work)
* Connect to Tello broadcasted network
* Update Firmware
Info and source code is under the `restful` folder.

##### First Time Setup for follower drones
* Verify serial number with mobile Tello app (important, or else commands don't work)
* Connect to Tello broadcasted network
* Update Firmware
* Change network name and password
  * `python cmd.py wifi dronen dronepass123`
  * where `n` is the nth drone
* Change network type to station mode
  * `python cmd.py ap network netpass123`


1. `get_ips.bat`
