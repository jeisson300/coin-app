require('dotenv').config();

const Server = require("./webserver/Server");

const server = new Server();

server.listen();