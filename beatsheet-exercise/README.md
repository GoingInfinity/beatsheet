# BeatSheet Exercise Starter

This guide provides instructions on how to run the beetsheet backend in a docker container.

## Requirements

To use this Docker container, you will need to have Docker installed on your system. If you do not have Docker installed, you can download it from [here](https://www.docker.com/products/docker-desktop).

## How to Run Docker Compose

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

This command will start the Docker container defined in the `docker-compose.yml` file. The BeatSheet API will be accessible at the port defined in the `docker-compose.yml` file.

## Stopping and Removing Containers

To stop the Docker container, you can run:

```bash
docker compose stop
```

This command will stop the running Docker container.

If you also want to remove the Docker container after stopping it, you can run:

```bash
docker compose down
```

This command will stop and remove the Docker container. Please note that any data not stored in a volume will be lost.

## Notes

Please ensure that the port defined in the `docker-compose.yml` file is not being used by any other applications to avoid any port conflict.
