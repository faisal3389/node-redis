const express = require("express");
const redis = require("redis");
const usersRouter = require("./routers/users.js");

const redisport = 6379;
//Create Redis CLient
let client = redis.createClient(redisport);

client.on("connect", () => {
  console.log("Connected to Redis...");
});

// Port
const port = 3000;

// Initialising express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers
app.use("/", usersRouter);

app.listen(port, () => {
  console.log("Server is on the port");
});
