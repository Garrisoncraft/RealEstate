# CraftSpace

## Project Overview
This is a full-stack real estate application consisting of a backend API built with Node.js and Express, and a frontend built with React and Vite. The application allows users to browse, add, edit, and manage property listings. It includes user authentication, image uploads, and database integration with MySQL.

---

## Backend

### Technologies
- Node.js with Express 5
- MySQL database
- Authentication with JWT
- File uploads with Multer
- Environment variables managed with dotenv

### Setup and Installation
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the necessary environment variables (e.g., database credentials, JWT secret).

4. Run database migrations located in `backend/migrations` to create necessary tables. You can run the migrations using the following command:
   ```bash
   node backend/migrations/create_users_table.sql
   node backend/migrations/create_properties_table.sql
   ```
### Running the Backend
- To start the backend server:
  ```bash
  npm start
  ```
- For development with auto-reloading:
  ```bash
  npm run dev
  ```

---

## Frontend

### Technologies
- React 19 with Vite
- Material UI (MUI) for UI components
- React Router DOM for routing
- React Toastify for notifications
- Tailwind CSS for styling
- ESLint for linting

### Setup and Installation
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Frontend
- To start the development server:
  ```bash
  npm run dev
  ```
- To build for production:
  ```bash
  npm run build
  ```
- To preview the production build:
  ```bash
  npm run preview
  ```

---

## Environment Variables
Both backend and frontend may require environment variables. Ensure you create `.env` files in their respective directories with the required variables such as database connection strings, JWT secrets, API URLs, etc.

---

## Database Migrations
The backend contains SQL migration scripts in `backend/migrations` to set up the database schema for users and properties. Run these migrations before starting the backend server.

---

## Folder Structure

```
/backend
  /migrations          # SQL migration scripts
  /middleware          # Express middleware (e.g., authentication)
  /routes              # API route handlers
  /uploads             # Uploaded images storage
  db.js                # Database connection setup
  index.js             # Backend server entry point
  package.json         # Backend dependencies and scripts

/frontend
  /public              # Public assets
  /src
    /assets            # Images and static assets
    /components        # React components
    App.jsx            # Main React app component
    main.jsx           # React app entry point
  package.json         # Frontend dependencies and scripts
  vite.config.js       # Vite configuration
  tailwind.config.js   # Tailwind CSS configuration
```

---

## Dependencies Overview

### Backend
- express
- mysql2
- bcrypt
- jsonwebtoken
- multer
- cors
- dotenv
- nodemon (dev)

### Frontend
- react, react-dom
- react-router-dom
- @mui/material, @mui/icons-material
- react-toastify
- tailwindcss, postcss, autoprefixer
- vite
- eslint and related plugins

---

## License
This project is licensed under the ISC License.

---

## Contact
For any questions or issues, please contact the project maintainer.
