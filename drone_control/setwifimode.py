from djitellopy import Tello

tello = Tello()

tello.connect()

tello.send_command_with_return("ap network netpass123")

tello.end()
