# Instawork Backend Project

A project created for an interview process at InstaWork.

## Description

This project was written using NodeJS in Typescript which interfaces with a MySQL database. The server.ts file acts as the main file, starting an HTTP server which accepts, processes, and responds to incoming HTTP requests to localhost on port 3000. database.ts contains a class with methods for interfacing with a MySQL database by creating a database and a table if not already created during initialization. Its methods are asynchronous and return promises of their requested data as the MySQL requests are not synchronous. members.ts contains async functions for retrieving this data, packaging it as a response and returning it back to the server to respond to the client.

## Getting Started

### Dependencies

* NodeJS
* MySQL

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)