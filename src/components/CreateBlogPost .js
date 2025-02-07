import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBlogPost } from "../redux/actions";
import ContentEditable from "./ContentEditable";

const CreateBlogPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

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

    const newPost = {
      id: Date.now(),
      title,
      content,
      likes: 0,
      unlikes: 0,
      hearts: 0,
      comments: [],
      image,
      created_at: { date: Date.now(), isUpdated: false },
    };

    dispatch(addBlogPost(newPost));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h3 className="text-center">Create Post</h3>

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
        <input type="file" accept="image/*" onChange={handleImageChange}/>
      </div>

      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  );
};

export default CreateBlogPost;
