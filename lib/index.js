const datastore = require("./database");
const debug = require("debug")("server:index");
const server = require("./server");

const init = async function init() {
  await datastore.init();
  debug("connected to database");
  server.listen();
};

init();
