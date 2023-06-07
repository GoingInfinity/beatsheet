# BeatSheet Exercise

This guide provides instructions on how to run the beetsheet backend in a docker container.

## Frontend

### Important details
The backend docker container doesn't have cors issue resolved. You will need to temporarily disable cors in your browser. You can add this chrome extension to disable CORS on demand: https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino

- This app was built on node version `18.16.0`. 

### Steps to get starts
1. `cd` into `frontend` folder
2. Install dependencies. `npm install`
3. Start environment. `npm run dev`


## Backend
### How to Run Docker Compose

1. `cd` into `backend` folder.
Run the following command to create the Docker container:

```bash
docker compose create
```

Run the following command to start the Docker container:

```bash
docker compose start
```

Alternatively, you can create and start the container by running:

```bash
docker compose up
```

## Stopping and Removing Containers

To stop the Docker container, you can run:

```bash
docker compose stop
```


