# Microservices - NestJS & RabbitMQ

This project demonstrates a microservices architecture using NestJS and RabbitMQ for inter-service communication. It consists of two main services: an Auth Service and a Product Service.

## Services

1.  **Auth Service:**

    - Handles user registration, login, logout, and JWT token management (access & refresh tokens).
    - Stores user credentials and basic profile information (name, email, role).
    - Provides an RPC endpoint via RabbitMQ for other services to validate and decode JWTs.
    - Publishes a `user.created` event to the `user.events` RabbitMQ exchange when a new user is registered.

2.  **Product Service:**
    - Manages a product catalog (CRUD operations).
    - Each product is associated with a user via `userId`.
    - Communicates with the Auth Service via RabbitMQ (RPC) to validate user tokens.
    - Implements authorization to ensure only product owners can modify/delete their products.
    - Listens for the `user.created` event from the Auth Service (Pub/Sub).

## Technical Stack

- **Framework:** NestJS
- **Communication:** RabbitMQ (RPC and Publish/Subscribe)
- **Database:** MongoDB with Typegoose
- **Containerization:** Docker
- **API Documentation:** Swagger (for both services)
- **Configuration:** `.env.example` files

## Setup Instructions

**Prerequisites:**

- Node.js (v20 or later recommended)
- npm
- Docker and Docker Compose
- Git

**Steps:**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/saifakib/nest-rabbitmq-microservice.git
    cd nest-rabbitmq-microservice
    ```

2.  **Create `.env` files:**

    Copy the example environment files:

    ```bash
    cp .env.example-auth auth-service/.env
    cp .env.example-product product-service/.env
    ```

    Update the variables in these `.env` files if needed. The default values should work for a local setup with Docker Compose.

3.  **Install dependencies:**

    ```bash
    cd auth-service
    npm install
    npm ci
    cd ../product-service
    npm install
    npm ci
    cd ..
    ```

4.  **Run with Docker Compose (Recommended for easy setup):**

    This will start MongoDB, RabbitMQ, the Auth Service, and the Product Service.

    ```bash
    docker-compose up --build -d
    ```

    To stop the services:

    ```bash
    docker-compose down
    ```

5.  **Run services independently (without Docker Compose):**

    **a) Start MongoDB:** Ensure you have a MongoDB instance running.

    **b) Start RabbitMQ:** Ensure you have a RabbitMQ instance running. Access the management UI at `http://localhost:15672` with the default credentials (`guest`/`guest`).

    **c) Start Auth Service:**

    ```bash
    cd auth-service
    npm run start:dev
    ```

    The Auth Service REST API will run on `http://localhost:3000`.
    The Auth Service Microservice will listen on the `auth.rpc.requests` RabbitMQ queue.
    Swagger documentation will be available at `http://localhost:3000/api`.

    **d) Start Product Service:**

    ```bash
    cd product-service
    npm run start:dev
    ```

    The Product Service REST API will run on `http://localhost:3001`.
    The Product Service will send RPC requests to the `auth.rpc.requests` queue.
    The Product Service will listen for `user.created` events on the `user.events` exchange (via the `product_service_user_events_queue`).
    Swagger documentation will be available at `http://localhost:3001/api`.
