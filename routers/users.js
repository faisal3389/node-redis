const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisport = 6379;
let client = redis.createClient(redisport);
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const postAsync = promisify(client.set).bind(client);
const getAllAsync = promisify(client.get).bind(client);


// router.get("/users", async (req, res) => {
//   try {
//     const userInfo = await getAllAsync();
//     if (!userInfo) {
//       console.log("user doesn't existss");
//       res.send("user doesn't existss");
//     } else {
//       console.log(userInfo)
//       res.send(JSON.parse(userInfo));
//     }
//   } catch (e) {
//     console.log("some error occcured", e);
//     res.send("some error occcured");
//   }
// });

router.get("/users/:userName", async (req, res) => {
  var userName = req.params.userName;
  try {
    const userInfo = await getAsync(userName);
    if (!userInfo) {
      console.log("user doesn't existss");
      res.send("user doesn't existss");
    } else {
      console.log(userInfo)
      res.send(JSON.parse(userInfo));
    }
  } catch (e) {
    console.log("some error occcured", e);
    res.send("some error occcured");
  }
});

router.post("/users", async (req, res) => {
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

router.patch("/users", async (req, res) => {
  let userInfo = req.body;
  console.log(userInfo);
  try {
    const isExists = await getAsync(userInfo.userName);
    if (!isExists) {
      console.log("user doesn't existss");
      res.send("user doesn't existss");
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
