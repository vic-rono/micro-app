const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  //generates random comment
  const commentId = randomBytes(6).toString("hex");
  const { content } = req.body;

  //if undefined return an empty array
  const comments = commentsId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsId[req.params.id] = comments;

  await axios.post("http://localhost:5005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;

  const { postId, id, status, content } = data;

  const comments = commentsByPostId[postId];
  //logic for updating the status of the comment and emmitted to the event-bus
  const comment = comments.find((comment) => {
    return comment.id === id;
  });
  comment.status = status;

  await axios.post("http://localhost:5005/events"),
    {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
        postId: req.params.id
      },
    };
  res.status(201).send(comments)
});

app.post('/events' , (req,res) =>{
  console.log('Event Received:', req.body.type)
  res.send({})
})

app.listen(5001, () => {
  console.log("server up on 5001!!!");
});
