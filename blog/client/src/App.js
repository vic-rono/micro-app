import React from 'react';
import CreatePost from './CreatePost'
import PostList from './PostList'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <div>
      <CreatePost />
      <hr />
      <h1 className='container'>Posts</h1>
      <PostList />
  </div>
  )
};

export default App;
