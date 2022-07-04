import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/posts", { title });
    setTitle("");
  };
  return (
    <div>
      <Form onSubmit={onSubmit} className="container">
        <h1>Create Post</h1>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;

//Cors request error 3000(frontend) does not connect to 6000(backend)
// UNSAFE_PORT_ERROR 6000 is a restricted port number used 5000 instead
