curl -X GET http://localhost:8000/status

curl -X POST -H "Content-Type: application/json" \
  -d '{"flight_plan":"LINE"}' \
  http://localhost:8000/command

curl -X GET http://localhost:8000/fetch

curl -X POST -H "Content-Type: application/json" \
  -d '{"drone_id":"1920003302","model":"TELLO EDU","active":true,"battery":5.3}' \
  http://localhost:8000/info

exit 1

curl -X POST -H "Content-Type: application/json" \
  -d '{"flight_plan":"LINE"}' \
  https://pennappsxx.herokuapp.com/command

curl -X GET https://pennappsxx.herokuapp.com/fetch



