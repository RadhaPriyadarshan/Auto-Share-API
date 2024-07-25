## Auto Share API

A RESTful API for the Auto Share car booking and sharing application.

### Features

- User Authentication (Login/Sign Up)
- Book and cancel car bookings
- Add reviews and ratings
- Password reset functionality

### Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- bcrypt

### Getting Started

#### Prerequisites

- Node.js
- npm or yarn
- MongoDB

#### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/auto-share-api.git
cd auto-share-api
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_uri
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_password
FRONTEND_URL=http://localhost:3000
```

4. Start the server:

```sh
npm start
# or
yarn start
```

5. The server will run on `http://localhost:5000`.

### API Endpoints

#### User Routes

- `POST /api/users`: Register a new user.
- `POST /api/users/login`: Login a user.
- `GET /api/users/:id/booked-cars`: Fetch booked cars for a user.
- `POST /api/users/:id/booked-cars`: Book a car.
- `DELETE /api/users/:id/booked-cars/:carId`: Cancel a booking.
- `POST /api/users/:id/reviews`: Add a review to a car.
- `POST /api/users/forgot-password`: Send password reset email.
- `POST /api/users/reset-password`: Reset password using token.

### Project Structure

```
src/
|-- models/
|   |-- user.js
|   |-- car.js
|-- routes/
|   |-- userRoutes.js
|-- config/
|   |-- db.js
|-- server.js
```

### Available Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with nodemon for development.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

