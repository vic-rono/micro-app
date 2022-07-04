import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const Comment = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Comment;
