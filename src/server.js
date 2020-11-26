const express = require("express");
const debug = require("debug")("server:server");
const compression = require("compression");
const router = require("./resources/router");
const cors = require("cors");
const { port } = require("./config");
var bodyParser = require("body-parser");

const Server = function Server() {
  this.app = express();
  this._init();
};

Server.prototype._init = function init() {
  this.app.disable("x-powered-by");
  this._addMiddlewares();
  this._addHealthCheck();

  debug("initialized all app routes");
  this.app.use(router);
};

Server.prototype._addMiddlewares = function addMiddlewares() {
  this.app.use([
    compression(),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(),
  ]);
};

Server.prototype._addHealthCheck = function addHealthCheck() {
  this.app.all("/health", (_, res) => {
    res.status(200).send();
  });
};

Server.prototype.listen = function listen() {
  this.app.listen(port, () => {
    debug("server listening on port %O", port);
  });
};

exports = module.exports = new Server();
