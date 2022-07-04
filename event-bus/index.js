const express = require("express");

const bodyParser = require("body-parser");
const axios = require("axios");

//associate the json middleware with the app
const app = express();
app.use(bodyParser.json());

app.post("/events",  async (req, res) => {
 const event = req.body;

  axios.post("http://localhost:5000/event", event);
  axios.post("http://localhost:5001/event", event);
  axios.post("http://localhost:5002/event", event);
 
  
  // downside there's a assumption that all requests will  no handling errors
  res.send({ status: "OK" });
 
})


app.listen(5005, () => {
  console.log("Running on 5005");
});
