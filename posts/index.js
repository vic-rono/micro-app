const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// for storing data in memory

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(6).toString("hex");

  const { title } = req.body;

  posts[id] = {
    id,
    title
  };
  await axios.post('http://localhost:5005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  // 201 created a new resource
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});

app.listen(5000, () => {
  console.log("server up on 5000!!!");
});
