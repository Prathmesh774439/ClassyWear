# ClassyWear - Prathmesh Kolam Mini Project - Sem 5 Project - BSc CS

A full-stack product shopping application built as a Semester 5 BSc Computer Science mini project.

## Project Structure

- `Frontend/` - React and Vite client application
- `backend/` - Express, MongoDB, authentication, product, and cart API

## Technologies Used

### Frontend

- React
- React Router
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Multer and ImageKit for image uploads

## Prerequisites

Install the following before running the project:

- Node.js 18 or later
- npm
- MongoDB database

## Backend Setup

1. Open a terminal in the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

   The API is available at `http://localhost:3000/api`.

## Frontend Setup

1. Open a second terminal in the `Frontend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Optional: create a `.env` file in the `Frontend` directory if the backend uses a different URL:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

   Open the URL shown by Vite, usually `http://localhost:5173`.

## Deployment Configuration

- **Render backend:** use `npm start` as the start command and set `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, and the ImageKit variables in the service environment. Set `NODE_ENV=production` so refresh-token cookies work across the deployed frontend and backend. Set `CLIENT_ORIGIN` to `https://classywear.netlify.app` (no trailing slash; multiple origins can be comma-separated).
- **Vite frontend:** set `VITE_API_URL=https://cartburster.onrender.com/api` in the frontend hosting environment, then trigger a fresh build/deploy. The `/api` suffix is required; Vite environment variables are embedded during the build.
- **Local development:** leave `VITE_API_URL` unset to use the deployed API, or set it to `http://localhost:3000/api` to use a local backend. Local refresh cookies remain configured for HTTP development.

## Available Scripts

### Backend

- `npm start` - Start the server with Node.js
- `npm run dev` - Start the server with Nodemon

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally

## Main Features

- User registration and login
- JWT-based authentication
- Product browsing and product details
- Product management through the backend API
- Shopping cart functionality
- Image upload support
- Protected frontend routes
- Theme support

## Author

**Prathmesh Kolam**  
BSc Computer Science, Semester 5
