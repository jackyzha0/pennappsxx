# Project Swarm Intelligent Drones (SID) - PennApps XX

##### [Link to Devpost](https://devpost.com/software/pennappsxx)

## Inspiration
We are fascinated by the pressing issues in environmental sustainability today. All growing up in green-driven cities in Canada, we feel almost useless in a completely different setting reading about tragic environmental events in current news. Learning about Amazon fires, consistent deforestation, pollution, and climate change, it pained us to see that many of our peers did not share that same sense of urgency. As a result, we were interested in making an initiative for ourselves, to ease the process of raising awareness for the environment in one way or another. The current lack of incentive of a call to action is a big driving force for us.

## What it does
Project SID is a autonomous drone swarm that is capable of efficient and large scale detection. In our demo, we've decided to apply it to tracking debris and trash. The drones carry out individual missions and provide data for us to generate reports mapping out hotspots and documenting the spread of debris.

## How we built it
Using Python and Flask for the backend to manage the actual drones and communications pipelines, machine learning for object detection and processing, and React for the frontend. Our project is divided into four distinct sections made up of the server, web application, machine learning model, and the hardware itself, each playing a vital role towards the final product.

1. The Server was written in Python using Flask to mediate commands and information exchange between the web interface and the drones.
2. The web app was developed as a dashboard, designed for easy deployment of automated drone missions.
3. The Machine Learning model used a retrained version of the YOLOv3 object detection algorithm to differentiate between trash and other items.
4. The drones themselves were DJI Tellos and were controlled using Python wrappers for the Tello SDK.

## Challenges we ran into
* Because of the sheer ambition and technical complexity of the project, making sure that all the components were able to talk to each other was an incredible challenge of our collective skills.
* Our two Tello EDU drones decided it would be a good idea to not connect anymore. Figuring a way to demo the functionality we originally intended was difficult.
* Photo resolution of drones was not great. This, coupled with our home-made image recognition model, meant that object detection wasn't always reliable.

## Accomplishments that we're proud of
Connecting so many various aspects of tech together. We had hardware, full-stack web dev, cloud, and even machine learning integrated into one project. With such an ambitious project, it's a miracle we even have something to demo.

## What's next for Project SID
Due to the time constraints of the hackathon, there were a lot of ideas that we unfortunately had to miss out on.
* implement true swarm functionality (e.g. no 'lead' drone)
* autonomous deployment of drone charging stations and wifi extenders, to increase the reach of SID
* live video streaming and manual takeover
* image stitching for generation of accurate terrain data
