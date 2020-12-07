# Task Manager
Task Manager is a web application with authentication for organizing your tasks.

![signup](/images/signup.png)
![tasks](/images/tasks.png)

# Run
You can run this application locally using Node and MongoDB or from a docker container.
## Local
Before running locally, you must have a MongoDB instance running on `localhost:27018`.
To start the server run the following commands from the project root directory.
```
cd server
npm install
npm start
```
To start the web application run the following commands from the project root directory.
```
cd app
npm install
npm start
```
The application will be available on `http://localhost:4200`.

## Docker
To run the project using Docker following commands from the project root directory.
```
docker-compose up --build -d
```
The application will be exposed on `http://localhost:80`.

# Features
- [x] Authentication (Sign Up and Login screens);
- [x] Tasks CRUD.