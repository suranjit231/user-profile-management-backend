# USER-PROFILE MANAGEMENT

## Introduction

This project provides a set of APIs for user management, including user registration, email confirmation, sign-in, and profile retrieval. The application uses Node.js and Express.js, with MongoDB as the database. JWT authentication is implemented for secure access to user routes.

## Important Notice
For detailed setup instructions and API testing, please refer to the "Setup" and "Swagger UI" sections below.

## Features

- **User Registration**: Allows new users to sign up with email confirmation.
- **Email Confirmation**: Validates user email addresses via JWT tokens.
- **User Sign-in**: Secure login mechanism for users.
- **User Profile Retrieval**: Fetches user profile details based on a valid JWT token.

## Tech Stack

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **JWT Authentication**: For secure user login and session management.
- **Bcrypt**: For hashing passwords.

## Setup
1. Clone the repository: `git clone https://github.com/suranjit231/user-profile-management-backend.git`
2. Install dependencies using `npm install`.
3. Set up environment variables in `.env` file (PORT, JWT_SECRET, DB_URL, EMAIL_USER, EMAIL_PASS, CLIENT_URL).
4. Start the server using `npm start`.
5. Open the port at `localhost:PORT/api-docs` to test the application.
``
## Important env varialble need for setup
- PORT=3200
- DB_URL= (mongodb url)
- JWT_SECRET=(secret key for jwt)
- EMAIL_USER=(Your email address for sending confirmation emails.)
- EMAIL_PASS=(The password or app-specific password for your email account)
- CLIENT_URL=http://localhost:3200  (The client URL where your application is running.)
``

## API Endpoints

### User Routes
- **POST /api/users/signup**: User signup
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "success": true, "message":"User registered successfully. Please check your email for confirmation" }`
  -

- **POST /api/users/signin**: User signin
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "token": "string" }`

- **GET /api/users/profile**: User profile
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Response: `{ "success": true, "message": "user data fetch sucessfully!", "user":{username, email, userId} }`


## USER-MANAGEMENT
```
##Root
|           |               
|           |                            
|           |---->config--->|-->connectDatabase.js
|           |                            
|           |
|--->src--->|                          
|           |                            |-->user.controller.js 
|           |               |            |-->user.repository.js
|           |---->core----> |-->users--->|-->user.routes.js              
|           |               |            |-->userSchema.js  
|           |                           
|           |                                                                                                          
|           |              
|           |-->middleware->|-->jwtAuth.middleware.js
|           |               |-->errorHandler.js
|           |               
|           |
|           |               |-->errors.js
|           |---->utils---->|-->handleError.js
|           |               |-->sendConfirmationMail.js
|           |
|
|
|-->.env
|-->package.lock.json
|-->package.json
|-->node_module
|-->README.md
|-->server.js
|-->swagger.js
```
