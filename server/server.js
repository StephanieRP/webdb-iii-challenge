const express = require("express");
const helmet = require("helmet");

const studentRouter = require("../router/students-router.js");
const cohortRouter = require("../router/cohorts-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/students", studentRouter);
server.use("/api/cohorts", cohortRouter);

module.exports = server;
