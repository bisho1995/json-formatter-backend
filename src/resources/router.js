const express = require("express");
const debug = require("debug")("server:main-router");
const jsonResource = require("./json/JsonResource");

const Router = function Router() {
  const router = express.Router();
  debug("initialized main-router");

  router.use(jsonResource);
  return router;
};

exports = module.exports = new Router();
