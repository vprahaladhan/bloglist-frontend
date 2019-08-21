import React, { useState } from 'react'
import { addLikesToBlog, removeBlog, showNotification } from '../reducers/blogsReducer'

let Blog = ({ blog, user, store }) => {
  const [ showDetailedBlog, setShowDetailedBlog ] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = async () => {
    store.dispatch(await addLikesToBlog(blog))
  }

  const deleteBlog = async () => {
    console.log('Token: ', JSON.parse(window.localStorage.getItem('user')).token)
    store.dispatch(await removeBlog(blog, JSON.parse(window.localStorage.getItem('user')).token))
    store.dispatch(showNotification(`Sucessfully deleted blog: ${blog.title}`, 'red'))
    setTimeout(() => store.dispatch(showNotification('', '')), 2000)
  }

  const showBlogDetails = () => {
    return (
      <div>
        <div onClick={() => setShowDetailedBlog(!showDetailedBlog)}>
          {blog.title}
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes&nbsp;&nbsp;
          <button onClick={incrementLikes}>like</button>
        </div>
        <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
        {JSON.parse(user).username === blog.user.username ? <button onClick={deleteBlog}>remove</button> : ''}
      </div>)
  }

  return (
    <div style={blogStyle}>
      {showDetailedBlog ?
        showBlogDetails() : <div className='show-blog-details' onClick={() => setShowDetailedBlog(!showDetailedBlog)}>
          {blog.title} - {blog.author}
        </div>
      }
    </div>
  )
}

export default Blog