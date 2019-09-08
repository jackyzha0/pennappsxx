import signal
import os
import time
import requests
from djitellopy import TelloSwarm

def run():
    ips = [x.rstrip() for x in open('ips.txt', 'r').readlines()][1:-1]
    ips = [x[0:20].replace(" ","") for x in ips]
    # ips = ["192.168.137.156"]

    swarm = TelloSwarm.fromIps(ips)
    swarm.connect()

    while not os.path.isfile('flightpath.txt'):
        time.sleep(0.1)

    with open('flightpath.txt') as fp:
       line = fp.readline()
       while line:
           swarm.send_command_with_return(line.replace('\n',''))
           line = fp.readline()
           time.sleep(5)

    # for cmd in commands:
    #     print(cmd)
    #     swarm.send_command_with_return(cmd)
    #     time.sleep(5)

    # swarm.send_command_with_return("takeoff")
    # time.sleep(5)
    # swarm.send_command_with_return("up 50")
    # time.sleep(5)
    # swarm.send_command_with_return("forward 10")
    # time.sleep(5)
    # # run by one tello after the other
    # swarm.sequential(lambda i, tello: tello.move_forward(i * 20))
    #
    # # making each tello do something unique in parallel
    # swarm.parallel(lambda i, tello: tello.move_left(i * 100))
    # swarm.get_frame_read().frame

    swarm.land()
    swarm.end()

    os.remove('flightpath.txt')

def sendTelloStatus(self):
    #send both tello status to server one after another
    t = self.tellos[0]
    URL = "https://penappsxx.herokuapp.com/info/"
    data = {
        'drone_id': t.address[0],
        'active': True,
        'battery': t.get_battery(),
        'flight_time': t.get_flight_time(),
        'speed': t.get_speed(),
        'model': 'tello-edu'
    }
    requests.post(url = URL, data = data)

    t = self.tellos[1]
    data = {
        'drone_id': t.address[0],
        'active': True,
        'battery': t.get_battery(),
        'flight_time': t.get_flight_time(),
        'speed': t.get_speed(),
        'model': 'tello-edu'
    }
    requests.post(url = URL, data = data)

def exit_gracefully(signum, frame):
    # restore the original signal handler as otherwise evil things will happen
    # in raw_input when CTRL+C is pressed, and our signal handler is not re-entrant
    signal.signal(signal.SIGINT, original_sigint)

    ips = [x.rstrip() for x in open('ips.txt', 'r').readlines()][1:-1]
    ips = [x[0:20].replace(" ","") for x in ips]
    swarm = TelloSwarm.fromIps(ips)
    swarm.land()
    swarm.end()

    # restore the exit gracefully handler here
    signal.signal(signal.SIGINT, exit_gracefully)

if __name__ == '__main__':
    # store the original SIGINT handler
    original_sigint = signal.getsignal(signal.SIGINT)
    signal.signal(signal.SIGINT, exit_gracefully)
    run()
