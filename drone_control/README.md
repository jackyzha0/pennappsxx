# DroneProject

| nth-drone | Name   | Password     | Owner | IP |
|-----------|--------|--------------|-------|----|
| 0         | drone0 | dronepass123 | Jacky | 192.168.137.111 |
| 1         | drone1 | dronepass123 | Hayden| 192.168.137.148 |
|           |        |              |       |

### Setup instructions
Create Access Point from Laptop using External WiFi adapter by going to `Settings > Mobile Hotspot > On`
* SSID: network
* Pass: netpass

##### First Time Setup
* Verify serial number with mobile Tello app (important, or else commands don't work)
* Connect to Tello broadcasted network
* Change network name and password
  * `python cmd.py wifi dronen dronepass123`
  * where `n` is the nth drone
* Change network type to station mode
  * `python cmd.py ap network netpass123`

##### Find addresses
* Settings > Mobile Hotspot > Connected Devices
