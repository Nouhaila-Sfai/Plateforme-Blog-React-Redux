import { useNavigate,useParams} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlogPost} from '../redux/actions';
import ContentEditable from './ContentEditable';

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
      if (!title.trim() || !content.trim() || !image) {
        alert("Please fill in all fields.");
        return;
      }
      const updatedPost = { ...post, title, content, image,created_at:{date:Date.now(),isUpdated:true}};
      dispatch(updateBlogPost(updatedPost));
      navigate('/');
    };
  
    return (
      <form onSubmit={handleSubmit} className="create-post-form">
      <h3 className="text-center">Edit Post</h3>

      <div className="form-group">
        <label>Title:</label>
        <ContentEditable
          html={title}
          onChange={setTitle}
          placeholder="Enter your title..."
        />
      </div>

      <div className="form-group">
        <label>Content:</label>
        <ContentEditable
          html={content}
          onChange={setContent}
          placeholder="Write your content here..."
        />
      </div>

      <div className="form-group">
        <label>Image:</label>
        {image && <img src={image} alt="Post Preview" className="post-preview" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <button type="submit" className="btn btn-primary">Edit</button>
    </form>
    );
  };

  export default EditBlogPost;



  