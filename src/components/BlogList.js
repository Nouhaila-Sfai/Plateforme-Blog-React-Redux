import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BlogPost from './BlogPost';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const BlogList = () => {
  let posts = useSelector((state) => state.posts);
  const [serchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  const totalPages = Math.ceil(posts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const lastIndex = startIndex + perPage;
  posts=posts.filter(post => post.title.toLowerCase().includes(serchTerm.toLowerCase()));
  posts = posts.slice(startIndex, lastIndex);

  console.log('====================================');
  console.log(posts);
  console.log('====================================');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
        <SearchBar searchTerm={serchTerm} setSearchTerm={setSearchTerm}/>
      <div className="posts-list">
      {posts.map((post) => ( 
        <div key={post.id}>
            <BlogPost post={post} /> 
        </div>  
      ))}
      </div>  
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      perPage={perPage}
      setPerPage={setPerPage}
      />
      </div>
  
  );
};

export default BlogList;