# Pharmacy Backend Setup

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Installation
1. Navigate to backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start MongoDB service

4. Update .env file with your MongoDB connection string

5. Start the server:
   ```
   npm run dev
   ```

## API Endpoints
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/medicines - Get all medicines
- POST /api/medicines - Add medicine
- PUT /api/medicines/:id - Update medicine
- DELETE /api/medicines/:id - Delete medicine
- POST /api/orders - Create order
- GET /api/orders/user/:userId - Get user orders
- GET /api/orders - Get all orders