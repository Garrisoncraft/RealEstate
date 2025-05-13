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

## API Documentation

### Authentication Endpoints

- **POST /auth/signup**
  - Request Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: 201 Created with message on success
  - Registers a new user.

- **POST /auth/login**
  - Request Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: 200 OK with JWT token on success
  - Authenticates user and returns a JWT token.

### Property Endpoints

- **GET /properties/get**
  - Response: List of all properties.

- **GET /properties/get/:id**
  - Response: Property details by ID.

- **POST /properties/add**
  - Headers: `Authorization: Bearer <token>`
  - Request Body: Form-data with property fields and optional image file.
  - Response: Created property object.
  - Adds a new property. Requires authentication.

- **PUT /properties/edit/:id**
  - Headers: `Authorization: Bearer <token>`
  - Request Body: Form-data with updated property fields and optional image file.
  - Response: Success message.
  - Edits a property. Requires authentication and ownership.

- **DELETE /properties/delete/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: Success message.
  - Deletes a property. Requires authentication and ownership.

## Testing Approach

- Postman collection created to test all API endpoints.
- Includes tests for signup, login, property CRUD operations.
- Authentication token is stored and used for protected routes.
- Tests check for correct status codes and response structure.

## Testing Summary

- Critical-path tests cover user registration, login, and property CRUD.
- Tests verify authorization and ownership restrictions.
- File upload tested via form-data requests.
- Tests can be run via Postman Collection Runner.

## Test Cases
- Import RealEstateApi.postman_collection.json into your postman and test
- Open Postman and import the collection file from path/RealEstateAPI.postman_collection.json.
- Ensure your backend server is running and set the baseUrl variable in Postman accordingly (default is http://localhost:5000).
- Run the requests individually or use the Collection Runner to run all tests.
- Use the signup and login requests first to generate an auth token for authenticated requests.

## Summary Development to Deployment Steps

1. Clone the repository.
2. Install backend dependencies: `npm install` in backend directory.
3. Install frontend dependencies: `npm install` in frontend directory.
4. Setup MySQL database:
   - Exported MySQL database from local MySQL server.
   - Imported the database into MySQL Workbench.
   - Configure `.env` file with database credentials.
5. Run database migrations located in `backend/migrations/`.
6. Start backend server: `node backend/index.js` or `npm start`.
7. Start frontend development server.
8. Use Postman to run API tests using the provided collection.
9. Deploy backend and frontend to production environment as needed.

---

## Contact
For any questions or issues, please contact the project maintainer.
