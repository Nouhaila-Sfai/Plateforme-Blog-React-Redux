import posts from "../posts.json"
const initialState = {
    posts: posts || [],
  };
  
  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BLOG_POST':
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
      case 'UPDATE_BLOG_POST':
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        };
      case 'DELETE_BLOG_POST':
        return {
          ...state,
          posts: state.posts.filter((post) => post.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default blogReducer;