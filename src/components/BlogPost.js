import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlogPost, deleteBlogPost } from "../redux/actions";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaComment,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const BlogPost = ({ post ,className}) => {
  //const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [reactionAnimation, setReactionAnimation] = useState(null);
  const commentsSectionRef = useRef(null);
  const navigate = useNavigate();
  const timeAgo = post.created_at?.isUpdated
    ? `Last updated ${moment(post.created_at.date).fromNow()}`
    : `${moment(post.created_at.date).fromNow()}`;

  const handleLike = () => {
    dispatch(
      updateBlogPost({
        ...post,
        likes: post.likes + 1,
      })
    );
    triggerReactionAnimation('like');
  };

  const handleUnlike = () => {
    dispatch(
      updateBlogPost({
        ...post,
        unlikes: post.unlikes + 1,
      })
    );
    triggerReactionAnimation('unlike');
  };

  const handleHeart = () => {
    dispatch(
      updateBlogPost({
        ...post,
        hearts: post.hearts + 1,
      })
    );
    triggerReactionAnimation('heart');
  };

  const triggerReactionAnimation = (reactionType) => {
    setReactionAnimation({ type: reactionType, active: true });

    setTimeout(() => {
        setReactionAnimation(null);
    }, 1000);
};

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleCommentSubmit = (e, post) => {
    console.log(post);
    e.preventDefault();
    if (newComment.trim() !== "") {
      const updatedPost = {
        ...post,
        comments: [...(post.comments || []), newComment.trim()],
      };
      dispatch(updateBlogPost(updatedPost));
      setNewComment("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteBlogPost(id));
    navigate("/");
  };

  useEffect(() => {
    if (showComments && commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showComments]);

  return (
    <div>
      <div className={`card ${className ?? "post-card"}`}>
 
        <Link to={`${className ? "" : `post/${post.id}`}`}>
          <img
            class={`card-img-top hover-overlay ${className ? "rounded-0" : ""}`}
            src={post.image}
            alt={post.title}
          />
        </Link>
        <div class="card-body">
        <h5 class="card-title" dangerouslySetInnerHTML={{ __html: post.title }}/>
          <p class="card-text" dangerouslySetInnerHTML={{ __html: post.content }}/>
          <p class="card-text">
            <small class="text-muted">{timeAgo}</small>
          </p>
        </div>
        <div className="card-body d-flex align-items-center gap-3">
          <button
            className={`
              border-0 bg-white ${post.likes > 0 ? "text-primary" : ""}
              ${reactionAnimation?.type === 'like' ? 'like-animation' : ''}
            `
          }
            onClick={() => handleLike()}
          >
            <FaThumbsUp /> {post.likes || 0}
          </button>
          <button
            className={`
              border-0 bg-white ${post.unlikes > 0 ? "text-warning" : ""}
              ${reactionAnimation?.type === 'unlike' ? 'unlike-animation' : ''}
              `}
            onClick={() => handleUnlike()}
          >
            <FaThumbsDown /> {post.unlikes || 0}
          </button>
          <button
            className={`
              border-0 bg-white ${post.hearts > 0 ? "text-danger" : "" }
              ${reactionAnimation?.type === 'heart' ? 'heart-animation' : ''}
              `}
            onClick={() => handleHeart()}
          >
            <FaHeart /> {post.hearts || 0}
          </button>
          {reactionAnimation && (
                <div className="reaction-overlay active">
                    {reactionAnimation.type === 'like' && <FaThumbsUp className="reaction-icon active like-icon text-primary" />}
                    {reactionAnimation.type === 'unlike' && <FaThumbsDown className="reaction-icon active unlike-icon text-warning" />}
                    {reactionAnimation.type === 'heart' && <FaHeart className="reaction-icon active heart-icon text-danger" />}
                </div>
            )}
          <button
            className={`border-0 bg-white ${
              post.comments.length > 0 ? "text-info" : ""
            }`}
            onClick={() => handleShowComments()}
          >
            <FaComment /> {post.comments ? post.comments.length : 0}
          </button>
          <Link to={`/edit/${post.id}`}>
            <button className="border-0 bg-white text-success">
              <FaEdit />
            </button>
          </Link>
          <button
            className="border-0 bg-white text-danger"
            onClick={() => handleDelete(post.id)}
          >
            <FaTrash />
          </button>
        </div>
        {showComments && (
          <div
            className="container comments-section mb-5"
            ref={commentsSectionRef}
          >
            <h3>Comments</h3>
            {post?.comments &&
              post?.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment}</p>
                </div>
              ))}
            <form onSubmit={(e) => handleCommentSubmit(e, post)}>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                rows="5"
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
