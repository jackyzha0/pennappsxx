rm flightpath.txt
rm ips.txt
rm img/*
arp -a | grep '192.168.137.' > ips.txt
C:\Users\Jacky\AppData\Local\Programs\Python\Python37\python.exe swarm.py
