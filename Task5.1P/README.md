ShiftSync is a lightweight Node.js web application built to simulate a shift management system.

Initialize a Node.js App
npm init -y

Install Required Dependencies
npm install express body-parser

API routes I implement

**1. GET - /shifts**

Returns a list of all dummy shifts.

**Example Response**
json
[
  {
    "id": 1,
    "date": "2024-04-10",
    "time": "09:00 - 17:00"
  }
]

**2. POST - /shifts**

Adds a new shift.

**Example Request**

{
  "date": "2024-04-15",
  "time": "10:00 - 18:00"
}

**Example Response**

{
  "message": "Shift created",
  "shift": {
    "id": 2,
    "date": "2024-04-15",
    "time": "10:00 - 18:00"
  }
}


**3. POST - /clockin**

Records a user clock-in.

**Example Request**

{
  "user_id": 101,
  "shift_id": 1
}

**Example Response**

{
  "message": "Clock-in successful",
  "time": "2024-04-12T10:23:56.789Z"
}

**How to Run Using Docker**
Step 1: Open terminal in project folder
cd shiftsync

Step 2: Build and run the container
docker-compose up --build

App will be running at:
http://localhost:3000

**How to Test the API**

You can use Postman or curl.

Postman:
1.Test GET /shifts

Method: GET
URL: http://localhost:3000/shifts
No body required

2.Test POST /shifts

Method: POST

URL: http://localhost:3000/shifts

Body tab → raw → JSON:

{
  "date": "2024-05-15",
  "time": "10:00 - 18:00"
}

Header: Content-Type: application/json

3.Test POST /clockin

Method: POST

URL: http://localhost:3000/clockin

Body tab → raw → JSON:

{
  "user_id": 224719679,
  "shift_id": 1
}

Header: Content-Type: application/json

**Health Checker**

1. Get the container id by running 
docker ps

Look under the STATUS column for (healthy).

2. 
docker inspect --format='{{json .State.Health}}' <ContainerID>
docker inspect --format='{{json .State.Health}}' 2d013fe74ebd 

This command returns the current health status of a container based on the healthcheck I've configured in my docker-compose.yml

**Push Docker Image**
1.Login:
docker login

2.Build the Docker Image (with Hub tag)
docker build -t s224719679/shiftsync-app .

3.Push the Image
docker push s224719679/shiftsync-app


**Run The Project**
1.Clone the project from github repository
git clone https://github.com/KeerthanaVijekumar/SIT737_s224719679.git
cd Task5.1P/shiftsync

2.Build & Run the Docker Container
docker-compose up --build

This will:
Build the image locally (named shiftsync-app)
Start the container on port 3000
Monitor health status via health check

3.Stop the app
docker-compose down

The Dockerfile is used to build a new image called shiftsync-app:latest. 
No need to pull anything from Docker Hub.Completely self-contained