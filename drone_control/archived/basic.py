from djitellopy import Tello
import cv2
import time

tello = Tello()

tello.connect()
tello.takeoff()

print(tello.send_read_command('battery?'))
time.sleep(5)
tello.send_control_command('up 50')
time.sleep(5)

tello.land()
tello.end()
