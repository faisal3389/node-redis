const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisport = 6379;
let client = redis.createClient(redisport);
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const postAsync = promisify(client.set).bind(client);

router.post("/user", async (req, res) => {
  let userInfo = req.body;
  console.log(userInfo);
  try {
    const isExists = await getAsync(userInfo.userName);
    if (isExists) {
      console.log("user already existss");
      res.send("user already existss");
    } else {
      const setVar = await postAsync(
        userInfo.userName,
        JSON.stringify(userInfo.value)
      );
      res.send("user data updated");
    }
  } catch (e) {
    console.log("some error occcured", e);
    res.send("some error occcured");
  }
});

module.exports = router;
