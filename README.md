# NodejsTry - Hotel Booking System

## Description

NodejsTry is a full-stack hotel booking application built with Node.js and Express. The system allows users to browse hotels, check room availability, and make bookings. It features a RESTful API backend with JWT authentication and PostgreSQL database integration.

## Features

- **User Authentication**: Register and login functionality with secure JWT authentication
- **Hotel Management**: Browse hotel listings and view detailed information
- **Room Availability**: Check room availability for specific dates
- **Booking System**: Create and manage room reservations
- **RESTful API**: Comprehensive API endpoints for all operations

## Language Composition

- JavaScript: 78.7%
- CSS: 10.9%
- HTML: 10.4%

## Installation

To install and set up this project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/DanyaYen/NodejsTry.git
```

2. Navigate to the project directory:

```bash
cd NodejsTry
```

3. Install the dependencies using npm:

```bash
npm install
```

## Configuration

Create a `.env` file in the project root directory with the following variables:

```
PORT=3000
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

## Database Setup

1. Create a PostgreSQL database with the name specified in your `.env` file
2. Run the initialization script to create tables:
   ```bash
   psql -U your_database_user -d your_database_name -f database/init.sql
   ```

## Starting the Project

To start the project, use the following command:

```bash
npm start
```

This will start the Node.js server and you can access the application in your browser at http://localhost:3000 (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Hotels
- **Get all hotels**: `GET /api/hotels`
- **Get hotel by ID**: `GET /api/hotels/:id`
- **Get available rooms**: `GET /api/hotels/:id/rooms`

### Bookings
- **Create booking**: `POST /api/bookings`
- **Get user bookings**: `GET /api/bookings/user`

## Testing the API

The project includes a `requests.http` file in the `src` directory that contains example API requests. You can use these with a REST client extension in your code editor to test the endpoints.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.
