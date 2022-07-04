const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post('/events' , async (req,res) =>{
 const {type, data } = req.body
  if(type === 'CommentCreated'){
    const status = data.content.includes('fuck') ? 'rejected' : 'approved'

    await axios.post('http://localhost:5005/events' , {
        type: 'CommentModerated',
        data: {
            id: data.id,
            postId: data.postId,
            status,
            content: data.content
        }
    })
  } 
})

app.listen(5003, ()=>{
    console.log('Server up on 5003')
})
