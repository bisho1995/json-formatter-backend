const express = require("express");
const debug = require("debug")("server:server");
const compression = require("compression");

const Server = function Server() {
  this.app = express();
  this._init();
};

Server.prototype._init = function init() {
  this.app.disable("x-powered-by");
  this._addMiddlewares();
  this._addHealthCheck();
};

Server.prototype._addMiddlewares = function addMiddlewares() {
  this.app.use([compression(), express.urlencoded({ extended: false })]);
};

Server.prototype._addHealthCheck = function addHealthCheck() {
  this.app.all("/health", (_, res) => {
    res.status(200).send();
  });
};

Server.prototype.listen = function listen() {
  const port = 8080;
  this.app.listen(port, () => {
    debug("server listening on port %O", port);
  });
};

exports = module.exports = new Server();
