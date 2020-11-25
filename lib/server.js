const express = require("express");
const debug = require("debug")("server:server");

const Server = function Server() {
  this.app = express();
};

Server.prototype.listen = function listen() {
  const port = 8080;
  this.app.listen(port, () => {
    debug("server listening on port %O", port);
  });
};

exports = module.exports = new Server();
