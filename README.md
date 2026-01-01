# IoT Server Stack Demo

This repository demonstrates hands-on experience with building and running an end-to-end IoT server stack using ESP32, MQTT, Node.js, InfluxDB, Grafana, and Docker.

The main purpose of this project is to show familiarity with the technologies, data flow, and basic system integration commonly used in IoT systems.

This is a technical demonstration project, not a production-ready product.

---

## Overview

The system collects sensor data from an ESP32 device, sends it via MQTT, processes it using a Node.js backend, stores it as time-series data in InfluxDB, and visualizes it using Grafana dashboards.  
All backend services are containerized using Docker Compose.

---

## Tech Stack

- **Device**: ESP32  
- **Protocol**: MQTT  
- **Broker**: Mosquitto  
- **Backend**: Node.js  
- **Database**: InfluxDB (time-series)  
- **Visualization**: Grafana  
- **Deployment**: Docker & Docker Compose  

---

## System Architecture

                ESP32
                  ↓
            MQTT (Mosquitto)
                  ↓
             Node.js Backend
                  ↓
               InfluxDB
                  ↓
            Grafana Dashboard
---

## Data Flow Explanation

1. ESP32 publishes sensor data to predefined MQTT topics.
2. Mosquitto acts as the MQTT broker.
3. Node.js subscribes to the MQTT topics and parses incoming messages.
4. Processed data is written to InfluxDB as time-series data.
5. Grafana queries InfluxDB and visualizes the data in dashboards.

---

## Project Structure

server-iot/
├── backend/ # Node.js MQTT subscriber & data processor
├── frontend/ # Web dashboard (if applicable)
├── mosquitto/ # Mosquitto configuration
├── screenshots/ # System screenshots
├── docker-compose.yml
├── .gitignore
└── README.md
---

## What This Project Demonstrates

- Setting up an MQTT broker using Mosquitto
- Publishing MQTT data from an ESP32 device
- Subscribing and processing MQTT messages in Node.js
- Writing time-series data to InfluxDB
- Visualizing IoT data using Grafana
- Running multiple services using Docker Compose
- Basic understanding of IoT data pipelines and system integration

---

## How to Run

### Prerequisites
- Docker
- Docker Compose

### Start the system
```bash
docker compose up -d


After the containers are running:

MQTT broker will be available internally

InfluxDB and Grafana will be accessible via configured ports

Grafana dashboards can be accessed through the browser

Screenshots
Docker Containers Running

Grafana Dashboard
![Grafana dashboard](screenshots\Screenshot 2026-01-01 193328.png)

MQTT Messages

Security Notes

Credentials, tokens, and secrets are excluded from this repository.

Sensitive data is stored locally and ignored using .gitignore.

This repository is safe to be public.

Notes

This project is intended as a learning and demonstration project.

The focus is on understanding the stack and data flow rather than feature completeness or scalability.