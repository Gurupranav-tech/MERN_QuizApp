# MERN Quiz App

A web-based quiz application built using the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to take quizzes, view results, and track their progress.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- User authentication (signup and login)
- Create and manage quizzes
- Take quizzes and view results
- Leaderboard to track top scores
- Responsive design for both mobile and desktop

## Technologies

This project is built using the following technologies:

- **Frontend**: React, Redux (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gurupranav-tech/MERN_QuizApp.git
   ```
2. Navigate to the server directory and install dependencies:
   ```bash
   cd MERN_QuizApp/server
   npm install
   ```
3. Navigate to the client directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Generate assymetric private and public key pairs in the server directory. To do this run the following command.
   ```bash
   cd MERN_QuizApp/server
   node generateKeyPair.js
   ```
5. Create a .env files in both server and client directory
   ```.env
   PORT=8000
   NODE_ENV=development
   DATABASE_URL='asdasd'
   SESSION_SECRET='secret'
   PUB_KEY_FILE="./id_rsa_pub.pem"
   PRIV_KEY_FILE="./id_rsa_priv.pem"
   VITE_SERVER_URL='url'
   VITE_PROD_URL='url'
   ```

### Running the Application

1. Start the server

```bash
cd server
npm start
```

2. In a new terminal, start the client server

```bash
cd client
npm start
```

3. Open your browser and go to http://localhost:3000 to access the application

## Usage

- Register or Log in to access quizzes.
- Create new quizzes or take existing ones.
- Review your scores and track your progress over time.
- Check the leaderboard to see top scores.

## Acknowledgement

- [Typescript](https://www.typescriptlang.org/) as the frontend and backend language
- [React](https://react.dev/) for the frontend framework.
- [Tailwindcss](https://tailwindcss.com/) for styling
- [framer-motion](https://www.framer.com/motion/) for animation
- [Express.js](https://expressjs.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Prisma](https://www.prisma.io/) for ORM
- [Node.js](https://nodejs.org/en) for the server runtime.
- Inspiration from various online quiz applications.

## Contact

- **Email**: [gurupranav08@gmail.com](mailto:gurupranav08@gmail.com) (I check this… sometimes)
- **LinkedIn**: [Find me](https://www.linkedin.com/in/p-r-guru-pranav-20b32722a)
