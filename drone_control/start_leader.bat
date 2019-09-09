rm flightpath.txt
rm ips.txt
rm img/*
arp -a | grep '192.168.137.' > ips.txt
python main.py
