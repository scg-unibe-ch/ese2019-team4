# Start the API

## Launch frontend

Go into the frontend folder and execute:
	ng serve --open

## Launch backend

Go into the backend folder and execute:
	node build/server.js


## Launch login prototype (for debugging)

Go into the login prototype folder and execute:
	ng serve --open --port 3333

The port ensures that the server is not running on the same port as the frontend server

**make sure that all servers run in sync** (at the same time), then hit the "update" buttons (on the login prototype page) to the the consumer and provider tables.

You can test the login and register function on the frontend page.

They should follow these rules:

1. **Login** Login checks whether a username exists in both tables. If the password also matches, "login successful" is displayed. Otherwise, "username or password incorrect" is displayed
2. **Register Provider** First checks if the passwords are the same and that there are no blank lines. Then checks if the username already exists in the provider table **or the consumer table**. If it does not find the username, it is added to the provider table and the registration was successfull.
3. **Register Consumer** Equivalent to register provider
