const express = require("express");

const JsonResource = function JsonResource() {
  const router = express.Router();

  router.post("/json", this.addJson);

  return router;
};

JsonResource.prototype.addJson = function addJson(req, res) {
  res.send("working");
};

exports = module.exports = new JsonResource();
