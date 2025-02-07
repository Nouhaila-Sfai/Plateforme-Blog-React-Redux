import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addBlogPost} from '../redux/actions';

const CreateBlogPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));//ah db hadik chno kadir galna liha chdi lina file li ghadi nselectewh ouradih lina link bach n9adro n7atoh f image
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
         const newPost = {
             id: Date.now(),
             title,
             content,
             likes: 0,
             unlikes: 0,
             hearts: 0,
             comments: [],
             image,
             created_at:{date:Date.now(),isUpdated:false}
         };
         dispatch(addBlogPost(newPost));
         navigate('/');
    };
    //npm install moment : dyalach glt ah galt lik katwana f les date  ach kadir lina matalane 
  //hadok kaytsamaw des package  react-router-dom redux moment

    return (
      <form onSubmit={handleSubmit} className="create-post-form">
        <h3 className='text-center'>Create Post</h3>
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
        {image && <img src={image} alt="Post Preview"  className="post-preview"/>}
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} required  />
      </div>
      <button type="submit" className="btn btn-primary">Create</button> 
    </form> 
    );
  };

  export default CreateBlogPost;