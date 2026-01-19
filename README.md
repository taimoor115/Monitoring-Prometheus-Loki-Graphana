# Monitoring Project

This project provides a simple monitoring solution using Node.js, Winston logger, and Loki for log aggregation. It is designed to be easily extensible and suitable for local or small-scale monitoring setups.

## Features
- Logging with Winston and Loki
- Docker Compose setup for easy deployment
- Prometheus configuration for metrics scraping
- Utility functions for request handling

## Prerequisites
- Node.js (v14 or higher recommended)
- Docker & Docker Compose

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Run the Node.js application:**
   ```bash
   node index.js
   ```

## File Structure
- `index.js` - Main application entry point
- `logger.js` - Winston logger setup with Loki transport
- `utility.js` - Utility functions
- `prometheus.yml` - Prometheus configuration
- `docker-compose.yml` - Docker Compose setup for services
- `request.http` - Example HTTP requests

## Logging
Logs are sent to both the console and a Loki instance (default: `http://127.0.0.1:3100`). You can view logs using Grafana or another compatible tool.

## Prometheus
Prometheus is configured via `prometheus.yml` to scrape metrics from your services. Adjust the configuration as needed for your environment.

## Customization
- Update `logger.js` to change log levels or add more transports.
- Modify `docker-compose.yml` to add/remove services.
- Edit `prometheus.yml` for custom metrics scraping.

