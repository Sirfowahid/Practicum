# Full-Stack Online Hotel Management System (MERN Stack)

## Description
This is a Full-Stack Online Hotel Management System built using the MERN stack (MongoDB, Express, React, Node.js). The system allows hotel administrators to manage room bookings, guests, payments, and more. It also enables users to view available rooms, make reservations, and manage their accounts.

## Features
- **User Features**:
  - Browse available rooms
  - Make room reservations
  - Manage user profile and booking history
  - Payment integration (SSLCOMMERZE)

- **Admin Features**:
  - Manage room availability and pricing
  - View and manage reservations
  - Handle guest profiles and payments
  - View analytics and booking statistics

## Tech Stack
- **Frontend**: React, Redux, Bootstrap, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (Local or Cloud MongoDB Atlas)

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Sirfowahid/Practicum.git
    cd online-hotel-management-system
    ```

2. **Backend Setup**:
    - Navigate to the backend directory and install dependencies:
        ```bash
        npm install
        ```
    - Create a `.env` file in the `backend` directory and add your MongoDB connection string:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
    - Start the backend server:
        ```bash
        npm start
        ```

3. **Frontend Setup**:
    - Navigate to the frontend directory and install dependencies:
        ```bash
        cd frontend
        npm install
        ```
    - Start the frontend development server:
        ```bash
        npm run dev
        ```

    The app should now be running on `http://localhost:5173`.

## Usage
1. Register as a user or login as an admin.
2. As a user, browse rooms, make reservations, and manage your profile.
3. As an admin, manage rooms, bookings, and view reports.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push the branch to your fork (`git push origin feature-branch`)
5. Create a pull request

## User Interface
### Landing Page
!(demo/Picture1.png)
### Rooms Page

### Bookings Page

### Dashboad Page

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
