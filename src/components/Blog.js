import React, { useState } from 'react'
import blogService from '../services/blogs'

let Blog = ({ blog, user }) => {
  const [ showDetailedBlog, setShowDetailedBlog ] = useState(false)
  const [ updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = () => {
    blogService.likeBlog(blog).then(response => setUpdatedBlog(response))
  }

  const deleteBlog = () => {
    blogService.removeBlog(updatedBlog, user)
  }

  const showBlogDetails = () => {
    return (
      <div>
        <div onClick={() => setShowDetailedBlog(!showDetailedBlog)}>
          {updatedBlog.title}
        </div>
        <div>{updatedBlog.url}</div>
        <div>
          {updatedBlog.likes} likes&nbsp;&nbsp;
          <button onClick={incrementLikes}>like</button>
        </div>
        <div>{updatedBlog.user ? `added by ${updatedBlog.user.name}` : ''}</div>
        {user.username === updatedBlog.user.username ? 
          <button onClick={deleteBlog}>remove</button> : ''}
      </div>)
  }

  return (
    <div style={blogStyle}>
      {showDetailedBlog ?  
        showBlogDetails() : <div onClick={() => setShowDetailedBlog(!showDetailedBlog)}>
                              {updatedBlog.title} - {updatedBlog.author}
                            </div>
      }
    </div>
  )
}

export default Blog