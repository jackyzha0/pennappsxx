curl -X GET http://localhost:8000/status

curl -X POST -H "Content-Type: application/json" \
  -d '{"flight_plan":"LINE"}' \
  http://localhost:8000/command

curl -X GET http://localhost:8000/fetch

curl -X POST -H "Content-Type: application/json" \
  -d '{"drone_id":"192.0.3.2","model":"TELLO EDU", "job_id":"1233-53f3-6g3-3rww", "active":True, "battery":"0.5", "flight_time":"54", "speed":"20"}' \
  http://localhost:8000/info/1

exit 1

curl -X POST -H "Content-Type: application/json" \
  -d '{"flight_plan":"LINE"}' \
  https://pennappsxx.herokuapp.com/command

curl -X GET https://pennappsxx.herokuapp.com/fetch



