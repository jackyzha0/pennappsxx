import sys
from djitellopy import Tello

tello = Tello()

tello.connect()

cmd = " ".join(sys.argv[1:])

tello.send_command_with_return(cmd)

tello.end()
