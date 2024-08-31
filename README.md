// @formatter:off

# TradesEquip

## Repo Link

[TradesEquip](https://github.com/SkimJazz/t3a2-b_tradesequip)


---
## Website Link

[TradesEquip](https://t3a2-b-tradesequip.onrender.com)

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

- **Demo User**: Application includes a demo user with pre-populated data for user to test the app before signing up.
- **User Authentication**: Users can sign up, log in, and log out of the application.
- **Client Management**: Users can add, view, edit, and delete clients.
- **Job Management**: Users can add, view, edit, and delete jobs for each client.
- **Dashboard**: Users can view a summary of their clients and jobs on the dashboard.
- **Responsive Design**: The application is designed to be responsive and work on different screen sizes.
- **Error Handling**: The application includes error handling for invalid inputs and failed API requests.
- **Protected Routes**: Certain routes are protected and require authentication to access.
- **File Upload**: Users can upload files for each job using the Cloudinary API.
- **Pagination**: The application paginates clients and jobs to improve performance and user experience.
- **Search and Filtering**: Users can search and filter jobs based on specific criteria.

---
## Frontend

## Front-End Dependencies

### axios
**axios** is a promise-based HTTP client for the browser and Node.js. It simplifies making asynchronous HTTP requests 
to REST endpoints, handling responses, and performing various network-related tasks.

### react
**react** is a free and open-source front-end JavaScript library for building user interfaces based on components. 
Developed by Facebook, it allows developers to create large web applications that can update and render efficiently 
in response to data changes.

### react-dom
**react-dom** serves as the entry point to the DOM and server renderers for React. It provides DOM-specific methods 
that can be used at the top level of a web app to enable an efficient way of managing DOM elements.

### react-icons
**react-icons** allows you to include popular icons in your React projects easily. It utilizes ES6 imports, enabling 
you to include only the icons that your project is using, thus optimizing performance.

### react-router-dom
**react-router-dom** contains bindings for using React Router in web applications. It enables dynamic routing in a web
app, allowing the app to update the URL and render new UI without making another request for a new document from the 
server.

### react-toastify
**react-toastify** allows you to add notifications to your app with ease. It provides a simple and customizable 
interface for creating toast notifications that can display messages, alerts, or notifications to users in a 
non-intrusive way.

### styled-components
**styled-components** is a library for styling React components using tagged template literals. It enables you to write
CSS in JavaScript by creating styled components, which are essentially React components with associated styles.



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

**User Signup**
- **POST** `/api/v0/auth/signup`
  - **Request Body:**
    ```json
    {
        "name": "Demo",
        "email": "test@test.com",
        "password": "secret123",
        "lastName": "test",
        "location": "anywhere"
    }
    ```
  - **Response:**
    ```json
     {
       "msg": "User created"
     }
    ```

**User Login**
- **POST** `/api/v0/auth/login`
    - **Request Body:**
      ```json
      {
        "email": "test@test.com",
        "password": "secret123"
      }
      ```
    - **Response:**
      ```json
      {
        "msg": "Welcome Demo!"
      }
      ```

**User Logout**
- **GET** `/api/v0/auth/logout`
    - No request body needed.
    - **Response:**
      ```json
      {
        "msg": "You are now logged out Demo"
      }
      ```
  
<br>
  
### User Endpoints

**Get current logged in user**
- **GET** `/api/v0/users/current-user`
    - No request body needed.
    - **DEMO Response:**
      ```json
      {
        "user": {
           "_id": "66cafc4e4666e325f82345fgq",
           "name": "demo",
           "email": "test@test.com",
           "lastName": "test",
           "location": "anywhere",
           "role": "user",
           "__v": 0
        }
      }
      ```
    - **SUPER Response:**
      ```json
        {
          "user": {
              "_id": "66cafc4e4666e325f8213df5",
              "name": "josh",
              "email": "josh@email.com",
              "lastName": "bennett",
              "location": "cairns",
              "role": "super",
              "__v": 0,
              "avatar": "https://res.cloudinary.com/dsrsntgx5/image/upload/v1725003913/huyocdvoqm31jqacvccu.jpg",
              "avatarPublicId": "huyocdvoqm31jqacvccu"
          }
        }
      ```

    - **USER Response:**
        ```json
        {
          "user": {
              "_id": "66d2a3c74a71cf3c1332d32a",
              "name": "gemma",
              "email": "gemma@email.com",
              "lastName": "bennett",
              "location": "cairns",
              "role": "user",
              "__v": 0,
              "avatar": "https://res.cloudinary.com/dsrsntgx5/image/upload/v1725080565/xyydto291mapztlcvmae.jpg",
              "avatarPublicId": "xyydto291mapztlcvmae"
            }
        }
      ```
      
      
    
      
    

**_SUPER USER ONLY:_ Get Stats on Signed-up users, and registered Jobs and Clients**

- **GET** `/api/v0/users/super/app-stats`
    - No request body needed.
    - **Response:**
        ```json
          {
            "users": 2,
            "jobs": 2,
            "clients": 2
          }
        ```

**Update user**
- **PATCH** `/api/v0/users/update-user`
    - **Request Body:**
      ```json
      {
        "name": "demo",
        "email": "test@test.com",
        "lastName": "test",
        "location": "some where"
      }
      ```
      
    - **Response:**
      ```json
       {
         "msg": "User Updated"
       } 
      ```
  
<br>

### Client Endpoints

**Get all Clients for logged-in user**
- **GET** `/api/v0/clients`
    - No request body needed.
    - **Response:**
      ```json
      {
          "myClients": [
          {
            "_id": "66d13405c48d9e063f6d3472",
            "clientCompName": "Smec Australia",
            "clientAddress": "480 St Pauls Terrace, Fortitude Valley, Queensland 4006",
            "projectContact": "Ade Haylett",
            "createdBy": "66cf09db1dbf4d46fad1c1bf",
            "createdAt": "2023-09-30T11:18:14.000Z",
            "updatedAt": "2023-09-30T11:18:14.000Z",
            "__v": 0
          },
          {
            "_id": "66d13405c48d9e063f6d3471",
            "clientCompName": "APD Engineering",
            "clientAddress": "Level 18, 160 Ann Street, Brisbane, Queensland 4000",
            "projectContact": "Stanton Harce",
            "createdBy": "66cf09db1dbf4d46fad1c1bf",
            "createdAt": "2023-10-13T19:56:20.000Z",
            "updatedAt": "2023-10-13T19:56:20.000Z",
            "__v": 0
          }
          {
            "client details...n": "client...n"
          }
        ]
      }
      ```
<br>

**Get Client By Id**
- **GET** `/api/v0/clients/id`
    - **Request Body:**
    - `{{url}}/clients/66d13405c48d9e063f6d3472` Using the SMEC id as above.
        ```json
        {
          "client": {
             "_id": "66d13405c48d9e063f6d3472",
                "clientCompName": "Smec Australia",
                "clientAddress": "480 St Pauls Terrace, Fortitude Valley, Queensland 4006",
                "projectContact": "Ade Haylett",
                "createdBy": "66cf09db1dbf4d46fad1c1bf",
                "createdAt": "2023-09-30T11:18:14.000Z",
                "updatedAt": "2023-09-30T11:18:14.000Z",
                "__v": 0
            }
        }
        ```
<br>

**Create New Client**
- **POST** `/api/v0/clients`
  - **Request Body:**
    ```json
      {
        "clientCompName": "Maximum effort needed to format JSON in a readme file",
        "clientAddress": "random client address",
        "projectContact": "random project contact"         
      }
    ```
  - Response
    ```json
      {
         "client": {
             "clientCompName": "Maximum effort needed to format JSON in a readme file",
             "clientAddress": "random client address",
             "projectContact": "random project contact",
             "createdBy": "66cafc4e4666e325f8213df5",
             "_id": "66cec4c0dde5571050b70040",
             "createdAt": "2024-08-28T06:33:36.854Z",
             "updatedAt": "2024-08-28T06:33:36.854Z",
             "__v": 0
        }
     }
    ```




**Update Client By ID**
- **PATCH** `/api/v0/clients/:id`
    - **Request Body:**
    - `{{url}}/clients/66d13405c48d9e063f6d3472` Using SMEC id and changing the `projectContact`
      ```json
      {
        "clientCompName": "Smec Australia",
        "clientAddress": "480 St Pauls Terrace, Fortitude Valley, Queensland 4006",
        "projectContact": "dan hanna"
      }
      ```
    - **Response:**
      ```json
        {
          "client": {
             "_id": "66d13405c48d9e063f6d3472",
                "clientCompName": "Smec Australia",
                "clientAddress": "480 St Pauls Terrace, Fortitude Valley, Queensland 4006",
                "projectContact": "dan hanna",
                "createdBy": "66cf09db1dbf4d46fad1c1bf",
                "createdAt": "2023-09-30T11:18:14.000Z",
                "updatedAt": "2023-09-30T11:18:14.000Z",
                "__v": 0
            }
          }
      ```

- **DELETE** `/api/v0/clients/:id`
    - Client ID needed in URL
    - `{{url}}/clients/66d13405c48d9e063f6d3472`
  
    - **Response:**
    ```js
        /** TODO: Add DELTE response */

    ```
  
<br>

### Job Endpoints


**Get all Jobs for logged-in user**
- **GET** `/api/v0/jobs`
    - No request body needed.
    - **Response**
      ```json
        {
          "totalJobs": 14,
          "numOfPages": 3,
          "currentPage": 1,
          "myJobs": [
            {
              "_id": "66d13405c48d9e063f6d345d",
              "clientName": "Thiess",
              "jobTitle": "Plumbing Specialist - Multistory High Rise",
              "jobStatus": "cancelled",
              "jobType": "plumbing",
              "jobLocation": "Newcastle",
              "createdBy": "66cf09db1dbf4d46fad1c1bf",
              "createdAt": "2024-08-10T22:45:01.000Z",
              "updatedAt": "2024-08-10T22:45:01.000Z",
              "__v": 0
          },
          {
              "_id": "66d13405c48d9e063f6d3458",
              "clientName": "Fulton Hogan",
              "jobTitle": "Formwork Specialist - Concrete Structures",
              "jobStatus": "pending",
              "jobType": "form-work",
              "jobLocation": "Adelaide",
              "createdBy": "66cf09db1dbf4d46fad1c1bf",
              "createdAt": "2024-08-09T01:44:29.000Z",
              "updatedAt": "2024-08-09T01:44:29.000Z",
              "__v": 0
          },
          {
              "job details...n": "Job...n"          
          }
        ]
      }
      ```
  
- **GET** `/api/v0/jobs/:id`
    - No request body needed.
    - `{{url}}/jobs/66d13495be82d134128ecd57` Using Thiess ID
        ```json
           {
              "job": {
                  "_id": "66d13495be82d134128ecd57",
                  "clientName": "Thiess",
                  "jobTitle": "Plumbing Specialist - Multistory High Rise",
                  "jobStatus": "cancelled",
                  "jobType": "plumbing",
                  "jobLocation": "Newcastle",
                  "createdBy": "66cafc4e4666e325f8213df5",
                  "createdAt": "2024-08-10T22:45:01.000Z",
                  "updatedAt": "2024-08-30T03:59:50.751Z",
                  "__v": 0
              }
          }
        ```
<br>

**Create New Job**
- **POST** `/api/v0/jobs`
    - **Request Body:**
      ```json
        {
          "jobTitle": "Big ass sinkhole",
          "jobStatus": "pending",
          "jobType": "surveyor",
          "jobLocation": "holloways beach cairns",
          "clientName": "douglas partners",
          "clientAddress": "13 Industrial Ave, Stratford QLD 4870",
          "projectContact": "jimbo dude"
        }
      ```
    - **Response**
       ```json
            {
                "job": {
                    "clientName": "douglas partners",
                    "jobTitle": "Big ass sinkhole",
                    "jobStatus": "pending",
                    "jobType": "surveyor",
                    "jobLocation": "holloways beach cairns",
                    "createdBy": "66cafc4e4666e325f8213df5",
                    "_id": "66d29e9e27d672fdc82aa621",
                    "createdAt": "2024-08-31T04:39:58.341Z",
                    "updatedAt": "2024-08-31T04:39:58.341Z",
                    "__v": 0
                }
            }
    
      ```

- **PATCH** `/api/v0/jobs/:id`
    - `{{url}}/jobs/66d29e9e27d672fdc82aa621` Changing `jobStatus` from `pending` to `complete`
    - **Request Body:**
       ```json
          {
             "msg": "job modified",
                "job": {
                "_id": "66d29e9e27d672fdc82aa621",
                "clientName": "douglas partners",
                "jobTitle": "Big ass sinkhole",
                "jobStatus": "completed",
                "jobType": "surveyor",
                "jobLocation": "holloways beach cairns",
                "createdBy": "66cafc4e4666e325f8213df5",
                "createdAt": "2024-08-31T04:39:58.341Z",
                "updatedAt": "2024-08-31T04:45:11.380Z",
                "__v": 0
             }
          }
       ```

- **DELETE** `/api/v0/jobs/:id`
    - No request body needed.
    - `{{url}}/jobs/66d29e9e27d672fdc82aa621`
    - Response
      ```json
        {
           "msg": "job deleted",
              "job": {
              "_id": "66d29e9e27d672fdc82aa621",
              "clientName": "douglas partners",
              "jobTitle": "Big ass sinkhole",
              "jobStatus": "completed",
              "jobType": "surveyor",
              "jobLocation": "holloways beach cairns",
              "createdBy": "66cafc4e4666e325f8213df5",
              "createdAt": "2024-08-31T04:39:58.341Z",
              "updatedAt": "2024-08-31T04:45:11.380Z",
              "__v": 0
           }
        }
        ```

<br>

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

