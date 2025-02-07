export const addBlogPost = (post) => ({
    type: 'ADD_BLOG_POST',
    payload: post,
  });
  
  export const updateBlogPost = (post) => ({
    type: 'UPDATE_BLOG_POST',
    payload: post,
  });
  
  export const deleteBlogPost = (id) => ({
    type: 'DELETE_BLOG_POST',
    payload: id,
  });