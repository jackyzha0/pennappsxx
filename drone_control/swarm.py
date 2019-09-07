from djitellopy import TelloSwarm
import time

ips = [x.rstrip() for x in open('ips.txt', 'r').readlines()][1:-1]
ips = [x[0:20].replace(" ","") for x in ips]
# ips = ["192.168.137.156"]
print(ips)

swarm = TelloSwarm.fromIps(ips)

swarm.connect()
# swarm.takeoff()

# run in parallel on all tellos
swarm.send_command_with_return("takeoff")

swarm.send_command_without_return("up 50")
time.sleep(3)
# swarm.send_command_without_return("forward 50")
# time.sleep(3)
# # run by one tello after the other
# swarm.sequential(lambda i, tello: tello.move_forward(i * 20))
#
# # making each tello do something unique in parallel
# swarm.parallel(lambda i, tello: tello.move_left(i * 100))
swarm.get_frame_read().frame

swarm.send_command_with_return("land")
swarm.end()
