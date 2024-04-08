# Welcome to MERN Auth App!

This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It includes authentication features that allow users to sign up, log in, and log out, and provides access to protected routes only for authenticated users.


## Working with the Project

Download this project from above link. Create two configaration files into the project.
First in the client and second in the api.

In the Client Folder create .env file and put this code inside it.

.env
```
VITE_FIREBASE_API_KEY='<server_domain>' # example 'http://localhost:8080'
```


After that create a file in the Server Folder with the name config.js and put the below code inside it.

config.js
```
export default {
    JWT_SECRET : "<secret>",
    MONGO_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Note:** The **MONGO_URI** is important to work this project.

Now, create all these variables in the project and make sure you set MONGO_URI variable.
Otherwise, the project will not work.
