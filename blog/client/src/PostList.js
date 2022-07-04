import React, {useState, useEffect } from 'react';
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Comment from './Comment'
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({})

    const fetchPosts =async () => {
        const res = await axios.get('http://localhost:5002/posts')

        setPosts(res.data)
    }
    useEffect(()=>{
    fetchPosts()
    },[])
    // object.values built-in javascript fuction that renders an array
    const renderedPosts = Object.values(posts).map(post=>{
        return (
        <Card style={{width: '30%', marginBottom: '20px'}}
        key={post.id}>   
        <Card.Body>
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <Comment postId={post.id}/>
        </Card.Body>
        </Card>
        )
    })
    //run the function one time
  return <div className='container d-flex justify-content-between'>{renderedPosts}</div>;
};

export default PostList;
