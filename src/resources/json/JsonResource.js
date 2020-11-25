const express = require("express");
const debug = require("debug")("server:jsonResource");
const {
  sequelize: { models },
} = require("../../database");

const JsonResource = function JsonResource() {
  const router = express.Router();

  router.post("/jsons", this.addJson);
  router.get("/jsons", this.getJson);

  return router;
};

JsonResource.prototype.getJson = async function getJson(req, res) {
  try {
    const Json = models.Json;
    const jsons = await Json.findAll();
    return res.status(200).send(jsons);
  } catch (error) {
    return res.status(500);
  }
};

JsonResource.prototype.addJson = async function addJson(req, res) {
  debug("in addJson");

  let { json } = req.body;
  let invalidJson = false;

  if (!json) invalidJson = true;
  else if (typeof json === "string") {
    try {
      json = JSON.parse(json);
    } catch (error) {
      invalidJson = true;
    }
  } else if (typeof json !== Object) {
    invalidJson = true;
  }

  if (!invalidJson) {
    try {
      const Json = models.Json;
      await Json.create({ json, url: Date.now() });
    } catch (error) {
      debug("Could not json to DB %O", err);
      return res.status(500).send();
    }
    return res.status(200).send();
  } else {
    debug("bad json request");
    res.status(400).send();
  }
};

exports = module.exports = new JsonResource();
