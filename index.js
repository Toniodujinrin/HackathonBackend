const express = require("express");
const cors = require("cors");
const handlers = require("./handlers");
const stringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const debug = util.debuglog("expressServer");
require("dotenv").config();

const expressApp = {};
const app = express();
app.use(cors());

const posts = (currentRoute) => {
  app.post(`/${currentRoute}`, (req, res) => {
    const data = {};

    data.headers = req.headers;
    data.query = req.query;
    let buffer = "";

    const decoder = new stringDecoder("utf-8");
    req.on("data", (data) => {
      buffer += decoder.write(data);
    });
    req.on("end", () => {
      buffer += decoder.end();

      const parsedJsonObject = JSON.parse(buffer);
      data.payload = parsedJsonObject;
      routes[currentRoute].post(data, (statusCode, resPayload) => {
        const stringPayload = JSON.stringify(resPayload);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.write(stringPayload);
        res.end();
        debug(statusCode, stringPayload);
      });
    });
  });
};
const gets = (currentRoute) => {
  app.get(`/${currentRoute}`, (req, res) => {
    const data = {};

    data.headers = req.headers;
    data.query = req.query;

    const decoder = new stringDecoder("utf-8");
    req.on("data", (data) => {
      buffer += decoder.write(data);
    });
    req.on("end", () => {
      buffer += decoder.end();

      //const parsedJsonObject = JSON.parse(buffer);
      //data.payload = parsedJsonObject;
      routes[currentRoute].get(data, (statusCode, resPayload) => {
        const stringPayload = JSON.stringify(resPayload);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.write(stringPayload);
        res.end();
        debug(statusCode, stringPayload);
      });
    });
  });
};

const puts = (currentRoute) => {
  app.put(`/${currentRoute}`, (req, res) => {
    const data = {};

    data.headers = req.headers;
    data.query = req.query;
    let buffer = "";

    const decoder = new stringDecoder("utf-8");
    req.on("data", (data) => {
      buffer += decoder.write(data);
    });
    req.on("end", () => {
      buffer += decoder.end();

      const parsedJsonObject = JSON.parse(buffer);
      data.payload = parsedJsonObject;
      routes[currentRoute].put(data, (statusCode, resPayload) => {
        const stringPayload = JSON.stringify(resPayload);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.write(stringPayload);
        res.end();
        debug(statusCode, stringPayload);
      });
    });
  });
};

const deletes = (currentRoute) => {
  app.delete(`/${currentRoute}`, (req, res) => {
    const data = {};

    data.headers = req.headers;
    data.query = req.query;

    req.on("end", () => {
      routes[currentRoute].delete(data, (statusCode, resPayload) => {
        const stringPayload = JSON.stringify(resPayload);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.write(stringPayload);
        res.end();
        debug(statusCode, stringPayload);
      });
    });
  });
};

posts("users");
// posts("tokens");
// posts("tasks");

// deletes("users");
// deletes("tokens");
// deletes("tasks");

// puts("users");
// puts("tokens");
// puts("tasks");

// gets("users");
// gets("tokens");
// gets("tasks");

const routes = {
  users: handlers.users,
  tokens: handlers.tokens,
};

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    ` express server is listening on port ${process.env.EXPRESS_PORT}`
  );
});

module.exports = expressApp;
