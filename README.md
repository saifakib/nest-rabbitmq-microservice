# Microservices with NestJS & RabbitMQ

A demonstration of microservices architecture using NestJS and RabbitMQ for inter-service communication between an Auth Service and a Product Service.

## Table of Contents

- [Features](#features)
- [Services](#services)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)

## Features

- User authentication (registration, login, logout)
- JWT token management (access & refresh tokens)
- Product catalog management (CRUD operations)
- Service-to-service authentication via RabbitMQ RPC
- Event-driven architecture with RabbitMQ Pub/Sub
- Containerized with Docker
- Comprehensive API documentation with Swagger

## Services

### Auth Service

- Handles user authentication and authorization
- Manages JWT tokens (access & refresh)
- Provides RPC endpoints for token validation
- Publishes user events to RabbitMQ
- REST API: `http://localhost:3000/api/v1`
- Swagger UI: `http://localhost:3000/api/v1/docs`

### Product Service

- Manages product catalog with owner-based permissions
- Consumes Auth Service via RabbitMQ RPC
- Subscribes to user events (Note: When user register, log view in product service terminal)
- REST API: `http://localhost:3001/api/v1`
- Swagger UI: `http://localhost:3001/api/v1/docs`

## Architecture

The system follows a microservices pattern with:

- REST APIs for external communication
- RabbitMQ for internal service communication
- MongoDB for data persistence
- Docker for containerization

## Technology Stack

- **Backend Framework:** NestJS
- **Message Broker:** RabbitMQ
- **Database:** MongoDB
- **ORM:** Typegoose
- **Containerization:** Docker
- **API Documentation:** Swagger/OpenAPI

## Getting Started

### Prerequisites

- Node.js v20+
- npm
- Docker and Docker Compose
- Git

### Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/saifakib/nest-rabbitmq-microservice.git
cd nest-rabbitmq-microservice
```

2.  **Run with Docker Compose:**

    This will start MongoDB, RabbitMQ, the Auth Service, and the Product Service.

    ```bash
    docker-compose up --build -d
    ```

    To stop the services:

    ```bash
    docker-compose down
    ```

## API Documentation

- Auth Service: `http://localhost:3000/api/v1/docs`
- Product Service: `http://localhost:3001/api/v1/docs`

## Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://elements.getpostman.com/redirect?entityId=5843132-25748ac3-8b7e-4e98-90b5-1a48f08048d6&entityType=collection)
