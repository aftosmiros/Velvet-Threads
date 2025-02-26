# Velvet-Threads

You can reach the deployed version here - https://velvet-threads-frontend.vercel.app

Deployed API - https://velvet-threads.vercel.app

Deployed admin panel - https://velvet-threads-admin.vercel.app


# Velvet-Threads

**Velvet-Threads** is a modern e-commerce platform designed to offer a seamless shopping experience. Built with the MERN stack, the application integrates a React-based frontend, an Express.js RESTful API backend, and a MongoDB database. It also includes secure user authentication via JSON Web Tokens (JWT), product image management with Cloudinary, and payment processing via Stripe.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)

---

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Product Management:** View, search, and filter products with advanced indexing for fast queries.
- **Order Management:** Place and track orders seamlessly.
- **Image Uploads:** Product images are managed through Cloudinary.
- **Payment Processing:** Secure payments via Stripe.
- **Responsive UI:** Built with React and optimized using Vite.

---

## Tech Stack

- **Frontend:** React 18, Vite, React Router, React Toastify
- **Backend:** Express.js, Node.js, Mongoose, JWT, Multer
- **Database:** MongoDB
- **External Services:** Cloudinary (image storage), Stripe (payment processing)

---

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14+)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [Stripe account](https://stripe.com/) and API keys
- A [Cloudinary account](https://cloudinary.com/) and credentials

### Installation Steps

   
1) **Clone the repo**
   ```bash
      git clone https://github.com/Bewin-btw/Velvet-Threads
      cd Velvet-Threads
2) **Install backend dependencies**
   ```bash
      cd backend
      npm install
3) **Install frontend dependencies**
   ```bash
      cd ../frontend  
      npm install
4) **Setup Environment Variables**
   ```bash      
      Create a .env file in the backend folder with the following variables:
      PORT=3000
      MONGODB_URL=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      STRIPE_SECRET_KEY=your_stripe_secret_key
      CLOUDINARY_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
5) Run the Application:
      ```bash 
         cd backend
         node server.js
      and
         cd frontend
         npm run dev



## Configuration
    •	Database: The backend is configured to connect to a MongoDB instance. Advanced indexes have been implemented in the database schema to ensure optimal performance.
    •	Authentication: JWT is used to secure API endpoints. Ensure that JWT_SECRET is set in your environment variables.
    •	Payment Processing: Stripe is used for payment processing. Make sure to configure your Stripe keys properly in the environment variables.
    •	Image Storage: Images are uploaded to Cloudinary. Configure your Cloudinary credentials in the .env file.
