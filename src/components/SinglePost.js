import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BlogPost from './BlogPost'
function SinglePost() {
  const {id} = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((p) => p.id === parseInt(id));
  return (

    <div className='post-blog'>
    <BlogPost post={post} className='single-post'  />
    </div>

  )
}

export default SinglePost