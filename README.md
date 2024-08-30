# TradesEquip

## Repo Link

[TradesEquip](https://github.com/SkimJazz/t3a2-b_tradesequip)


---
## Website Link

```js
/** 
 * TODO: Remember to 'Custom Domain' the website link in Render.com
 * 
 * */


```


---

## Installation

```js
/**
 * TODO: Add this after the project is deployed
 * scripts need to be added to the server side package.json file
 * The updated script will allow the user / developer to run a 'one liner' command to
 * install the project dependencies and start the server and client concurrently. AWESOME!
 */
```


---
## Project and Structure

The `Tradesequip` project is organized into two main directories: `client` and the projects root directory `server`. 
The `client` directory contains the frontend code, which is built using React, while the `server` directory contains
the backend code, which is built using Node.js and Express.
```js
/** 
 * TODO: Add stuff about Vite
 * Vite can be used to improve the development workflow, especially for the frontend built with React.
 * 
 * Vite Benefits:
 * - Faster build times
 * - Hot module replacement
 * - Improved development experience - faster development server and better error handling
 * - Better performance - faster page loads and better runtime performance
 * - Easier to configure
 * - Modern JavaScript support
 * 
 * TODO: Include MERN stack, project description, and project goals
 * */

```

### Client Directory
The `client` directory is structured to separate concerns and improve maintainability. It includes subdirectories
for components, pages, utilities, and styled components. Each subdirectory contains files that are logically grouped
together, making it easier to navigate and manage the codebase.

### Server - Projects Root Directory
The `server` directory follows a modular structure, with separate folders for `controllers`, `models`, `routes`, `middleware`,
and `utilities`. This organization helps in maintaining a clear separation of concerns, making the backend code more 
readable and easier to manage. The server.js file is responsible for handling API requests, interacting with the MongoDB
database, and implementing business logic.





### Key Features and Functionalities

- **User Authentication**: Users can sign up, log in, and log out of the application.
- **Client Management**: Users can add, view, edit, and delete clients.
- **Job Management**: Users can add, view, edit, and delete jobs for each client.
- **Dashboard**: Users can view a summary of their clients and jobs on the dashboard.
- **Responsive Design**: The application is designed to be responsive and work on different screen sizes.
- **Error Handling**: The application includes error handling for invalid inputs and failed API requests.
- **Protected Routes**: Certain routes are protected and require authentication to access.
- **File Upload**: Users can upload files for each job using the Cloudinary API.
- **Pagination**: The application paginates clients and jobs to improve performance and user experience.
- **Search and Filtering**: Users can search and filter clients and jobs based on specific criteria.

---
## Frontend

### Libraries & Packages & Technologies
- JavaScript (ES6 Modules)
- React
- npm 
- styled-components
- react-router-dom
- dayjs
- react-icons
- react-toastify

### Key Components
- **`client/src/components`**: Contains reusable React components such as `Client`, `FormRow`, `Job`, `Navbar`, etc.
- **`client/src/pages`**: Contains page components like `DashboardLayout`, `EditClient`, `Login`, `MyClients`, etc.
- **`client/src/utils`**: Contains utility files like `axiosFetch.js` for custom Axios instances and `Links.jsx` for 
     navigation links.
- **`client/src/wrappers`**: Contains styled components using `styled-components` for various UI elements.
- **`client/src/App.js`**: The main component that renders the application layout and routes.

> Ref:  `client/src/components` directory for more details on the components used in the application.

### Styling
The application uses `styled-components` for styling React components. This allows for scoped CSS and dynamic styling
based on props.

> Ref: `client/src/wrappers` directory for styled components used in the application.

---
## Backend

### Libraries & Packages & Technologies
- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- cloudinary
- cookie-parser
- dotenv
- express-validator
- jsonwebtoken
- multer
- nanoid

### Key Directory Components of the Backend
- **`controllers`**: Contains controller functions for handling requests.
- **`errors`**: Contains custom error classes and error handling middleware.
- **`middleware`**: Contains middleware functions for request processing.
- **`models`**: Contains Mongoose models for MongoDB collections.
- **`routes`**: Contains route definitions for the API.
- **`utils`**: Contains utility functions, configurations and mock data for the applications Demo user.
- **`server.js`**: The _Balls of the Backend_ file that initializes the Express server and connects to MongoDB.

> Ref: Projects root directory for more details on the backend components and their functionalities.

---
## Common Coding Principles & Practices used

This application follows common coding principles and practices to ensure a clean, maintainable, and scalable codebase.
While not strictly following any specific design pattern, it incorporates concepts from Object-Oriented Programming (OOP)
and Functional Programming (FP) paradigms.

### Key Principles & Practices
- **Modularization**: The code is organized into modules, each responsible for a specific functionality.
- **Reusability**: Components and functions are designed to be reusable across different parts of the application.
- **Separation of Concerns**: The frontend and backend are separated, with clear boundaries between UI, business logic,
    and data access layers.
- **Error Handling**: The application uses middleware and try-catch blocks to handle errors gracefully.

### Unique Code Blocks
- **Custom Axios Instance**: The `axiosFetch.js` file in `client/src/utils` creates a custom Axios instance for making HTTP requests.
- **Styled Components**: The `client/src/wrappers` directory contains styled components that encapsulate CSS within JavaScript.
- **React Router Loaders and Actions**: The application uses React Router's loader and action functions to fetch data and handle form submissions.


---
## API Endpoints

### Auth Endpoints

- **POST** `/api/v0/auth/signup`
    - **Request Body:**
      ```json
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "location": "New York",
        "lastName": "Doe"
      }
      ```

- **POST** `/api/v0/auth/login`
    - **Request Body:**
      ```json
      {
        "email": "john.doe@example.com",
        "password": "password123"
      }
      ```

- **GET** `/api/v0/auth/logout`
    - No request body needed.
  
<br>
  
### User Endpoints


- **GET** `/api/v0/users/current-user`
    - No request body needed.

- **GET** `/api/v0/users/super/app-stats`
    - No request body needed.

- **PATCH** `/api/v0/users/update-user`
    - **Request Body:**
      ```json
      {
        "name": "John",
        "email": "john.doe@example.com",
        "lastName": "Doe",
        "location": "New York"
      }
      ```
<br>

### Client Endpoints

- **GET** `/api/v0/clients`
    - No request body needed.

- **POST** `/api/v0/clients`
    - **Request Body:**
      ```json
      {
        "clientCompName": "ABC Corp",
        "clientAddress": "123 Main St, New York, NY",
        "projectContact": "Jane Smith"
      }
      ```

- **GET** `/api/v0/clients/:id`
    - No request body needed.

- **PATCH** `/api/v0/clients/:id`
    - **Request Body:**
      ```json
      {
        "clientCompName": "ABC Corp",
        "clientAddress": "123 Main St, New York, NY",
        "projectContact": "Jane Smith"
      }
      ```

- **DELETE** `/api/v0/clients/:id`
    - No request body needed.

<br>

### Job Endpoints

- **GET** `/api/v0/jobs`
    - No request body needed.

- **POST** `/api/v0/jobs`
    - **Request Body:**
      ```json
      {
        "clientName": "ABC Corp",
        "jobTitle": "Software Developer",
        "jobLocation": "New York",
        "jobStatus": "pending",
        "jobType": "form-work"
      }
      ```

- **GET** `/api/v0/jobs/:id`
    - No request body needed.

- **PATCH** `/api/v0/jobs/:id`
    - **Request Body:**
      ```json
      {
        "clientName": "ABC Corp",
        "jobTitle": "Software Developer",
        "jobLocation": "New York",
        "jobStatus": "in-progress",
        "jobType": "concreting"
      }
      ```

- **DELETE** `/api/v0/jobs/:id`
    - No request body needed.


## Database and Setup

This MERN application uses MongoDB, a NoSQL database, with Mongoose as the Object Data Modeling (ODM) library.
The database structure includes collections that correspond to Mongoose models defined in the `models` directory.

Key components related to the database include:
- `models`: Contains Mongoose models for MongoDB collections.
- `controllers`: Houses functions that interact with the database via the models.
- `routes`: Defines API endpoints that trigger controller functions for database operations.

The application connects to MongoDB using Mongoose, with the database URI securely stored in environment variables. 
This setup allows the application to perform CRUD operations on the MongoDB database via defined API endpoints.

> Ref: `server.js` for the database connection setup and `models` directory for Mongoose models.

## Deployment

## Testing

### Development

### Production

## Project Management

### Trello

