import { useNavigate,useParams} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlogPost} from '../redux/actions';

const EditBlogPost = () => {
    const { id } = useParams();
    const posts = useSelector((state) => state.posts);
    const post = posts.find((p) => p.id === parseInt(id));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');
    const [image, setImage] = useState(post ? post.image : null);
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const updatedPost = { ...post, title, content, image,created_at:{date:Date.now(),isUpdated:true}};
      dispatch(updateBlogPost(updatedPost));
      navigate('/');
    };
  
    return (
      <form onSubmit={handleSubmit} className="create-post-form">
        <h3 className='text-center'>Edit Post</h3>
      <div className="form-group"> 
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea id="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        {image && <img src={image} alt="Post Preview" className="post-preview" />}
        <input type="file" accept="image/*" id="image" onChange={handleImageChange} />
      </div>
      <button type="submit" className="btn btn-success">Edit</button> 
    </form>
    );
  };

  export default EditBlogPost;



  