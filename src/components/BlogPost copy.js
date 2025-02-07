import { useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateBlogPost, deleteBlogPost } from '../redux/actions';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaComment,FaEdit,FaTrash } from 'react-icons/fa';

const BlogList = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');

  const handleLike = (id) => {
    dispatch(updateBlogPost({
      ...posts.find(post => post.id === id),
      likes: posts.find(post => post.id === id).likes + 1
    }));
  };

  const handleUnlike = (id) => {
    dispatch(updateBlogPost({
      ...posts.find(post => post.id === id),
      unlikes: posts.find(post => post.id === id).unlikes + 1
    }));
  };

  const handleHeart = (id) => {
    dispatch(updateBlogPost({
      ...posts.find(post => post.id === id),
      hearts: posts.find(post => post.id === id).hearts + 1
    }));
  };

  const handleCommentSubmit = (e,post) => {
      console.log(post);
    e.preventDefault();
    if (newComment.trim() !== "") {
        const updatedPost = {
            ...post,
            comments: [...(post.comments || []), newComment.trim()],
        };
        dispatch(updateBlogPost(updatedPost));
        setNewComment(''); 
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteBlogPost(id));
  };

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-post">
          {post.image && <img src={post.image} alt={post.title} className="post-image" />}
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="post-actions">
            <span onClick={() => handleLike(post.id)}><FaThumbsUp /> ({post.likes || 0})</span>
            <span onClick={() => handleUnlike(post.id)}><FaThumbsDown /> ({post.unlikes || 0})</span>
            <span onClick={() => handleHeart(post.id)}><FaHeart /> ({post.hearts || 0})</span>
            <span><FaComment /> {post.comments ? post.comments.length : 0}</span>
            <Link to={`/edit/${post.id}`}><FaEdit /></Link>
            <button onClick={() => handleDelete(post.id)}><FaTrash /></button>
          </div>
          <div className="comments-section">
        <h3>Comments</h3>
        {post?.comments && post?.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment}</p>
          </div>
        ))}
        <form onSubmit={(e)=>handleCommentSubmit(e,post)}>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;