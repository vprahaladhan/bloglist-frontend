import React, { useState } from 'react'
import blogService from '../services/blogs'

let Blog = ({ blog }) => {
  const [ showDetailedBlog, setShowDetailedBlog ] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showBlogDetails = () => {
    return (
      <div>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes&nbsp;&nbsp;
          <button>like</button>
        </div>
        <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
      </div>)
  }

  return (
    <div style={blogStyle} onClick={() => setShowDetailedBlog(!showDetailedBlog)}>
      {showDetailedBlog ?  showBlogDetails() : `${blog.title} - ${blog.author}`}
    </div>
  )
}

export default Blog