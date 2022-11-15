# Instawork Backend Project

A project created for an interview process at InstaWork.

## Description

This project was written using NodeJS in Typescript which interfaces with a MySQL database. The server.ts file acts as the main file, starting an HTTP server which accepts, processes, and responds to incoming HTTP requests to localhost on port 3000. database.ts contains a class with methods for interfacing with a MySQL database by creating a database and a table if not already created during initialization. Its methods are asynchronous and return promises of their requested data as the MySQL requests are not synchronous. members.ts contains async functions for retrieving this data, packaging it as a response and returning it back to the server to respond to the client.

## Getting Started

### Dependencies

* Linux+BASH environment
* NodeJS
* MySQL

### Installing

* Clone this repository
```
git clone https://github.com/The0919/InstaWork-Backend-Take-Home
```
* Make sure MySQL is working as expected
* Create a MySQL user mysql@localhost with password 'password' and permissions to create databases. In a production program this would be replaced with an established user on a remote database

### Executing program

* Move inside the root of the project and run the server start command
```
cd InstaWork-Backend-Take-Home/
npx ts-node source/server.ts
```
### HTTP Examples
Once the server is running on localhost:3000, HTTP GET and POST requests can be sent to it.

To retrieve the current list of all members:
```
curl --location --request GET 'localhost:3000/users'
```
To add a new user:
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{"firstName":"Theo","lastName":"Donacik","phone":"6077440159","emailId":"donacik.t@norhteastern.edu","role":0}'
```
To delete a specific user (ex a user with an ID of 12)
```
curl --location --request GET 'localhost:3000/users/12'
```
Or to edit a specific user (ex a user with an ID of 13)
```
curl --location --request POST 'localhost:3000/users/13' \
--header 'Content-Type: application/json' \
--data-raw '{"firstName":"Theodore","emailId":"tdonacik@instawork.com","role":1}'
```

## Help

If you receive an error 
```
Error: connect ENOENT /var/run/mysqld/mysqld.sock
    at PipeConnectWrap.afterConnect [as oncomplete] (node:net:1300:16) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'connect',
  address: '/var/run/mysqld/mysqld.sock',
  fatal: true
```
Then it is likely that your mysqld.sock is not located at the given address. This should be the default for most linux distributions as it was for my desktop, but in my Fedora VM for example this was located at /var/lib/mysql/mysql.sock instead. You may need to find this socket on your own system and replace the line 12 in ./controllers/database.ts to reflect this difference.

## Authors

Theo Donacik (donacik.t@northeastern.edu)