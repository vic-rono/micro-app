const express = require("express");

const bodyParser = require("body-parser");

const cors = require('cors')

const app = express();

app.use(bodyParser.json())
app.use(cors())

const posts = {};



app.get("/posts", (req, res) => {
    res.send(posts)
  });

app.post("/events", (req, res) => {
    const { type, data} = req.body
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }
    
    if(type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, postId, status  })
    }

    if(type === 'CommentUpdated') {
      const { id, content, postId, status } = data;

      const post = posts[postId];
      const comment = post.comments.find(comment => {
        return comment.id === id
      })

      comment.status = status;
      commment.content = content
  }
    console.log(posts)
    res.send({})

  }); 

app.listen(5002, () => {
    console.log('server up on 5002')
})