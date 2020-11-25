const { Sequelize } = require("sequelize");
const path = require("path");
const debug = require("debug")("server:database");

const dbUri = path.join(__dirname, "datastore", "database.db");

const DataStore = function DataStore() {
  this._connecting = null;
  this._connectionError = null;
  this._retriesLeft = 5;

  debug("database uri %O", dbUri);
  this.sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbUri,
  });
};

DataStore.prototype.init = function init() {
  return new Promise((resolve) => {
    const authenticateCallback = function authenticateCallback(err) {
      this._connecting = false;
      if (err) {
        this._connectionError = err;
        this._retriesLeft--;
        debug(
          "failed to connect to database, retried left = %O",
          this._retriesLeft
        );
        if (this._retriesLeft > 0) this._authenticate(authenticateCallback);

        // kill app so that it does not start if database connection fails
        debug("error connecting to database %O", err);
        throw new Error("Cannot connect to database", err);
      } else {
        resolve();
      }
    };
    this._authenticate(authenticateCallback);
  });
};

DataStore.prototype._authenticate = async function authenticate(cb) {
  this._connecting = true;
  try {
    await this.sequelize.authenticate();
    cb(null);
  } catch (error) {
    cb(error);
  }
};

exports = module.exports = new DataStore();
