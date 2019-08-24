import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { addLikesToBlog, addCommentToBlog, removeBlog, showNotification } from '../reducers/blogsReducer'

let Blog = ({ blog, user, store }) => {
  // const [ showDetailedBlog, setShowDetailedBlog ] = useState(false)
  const [ redirect, setRedirect ] = useState(false)
  const [ comment, setComment ] = useState('')

  const incrementLikes = async () => {
    store.dispatch(await addLikesToBlog(blog))
  }

  const addComment = async() => {
    store.dispatch(await addCommentToBlog(blog, comment))
    setComment('')
  }

  const deleteBlog = async () => {
    setRedirect(true)
    store.dispatch(await removeBlog(blog, JSON.parse(window.localStorage.getItem('user')).token))
    store.dispatch(showNotification(`Sucessfully deleted blog: ${blog.title}`, 'green', 'success'))
    setTimeout(() => store.dispatch(showNotification('', '', '')), 2000)
  }

  const showBlogDetails = () => {
    return (
      <div>
        {blog ?
          <div>
            {/* <div onClick={() => setShowDetailedBlog(!showDetailedBlog)}> */}
            <div><h1>{blog.title}</h1></div>
            {/* </div> */}
            <div>{blog.url}</div>
            <div>
              {blog.likes} likes&nbsp;&nbsp;
              <button className="ui button" onClick={incrementLikes}>like</button>
            </div>
            {console.log('User in Blog.js: ', blog)}
            <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
            <div>{console.log(`User 1: ${user.username}, User 2: ${blog.user.username}`)}</div>
            <div>
              {user.username === blog.user.username ? <button className="ui button" onClick={deleteBlog}>remove</button> : ''}
            </div>
            <div><h3>comments</h3></div>
            <div>
              <input
                type='text'
                name='comment'
                placeholder='add comment...'
                value={comment}
                onChange={(event) => setComment(event.target.value)} />
              <button className="ui button" onClick={addComment}>add comment</button>
            </div>
            <div>
              <ul>
                {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
              </ul>
            </div>
          </div> : null}
      </div>
    )
  }

  return (
    <div>
      <div>
        {console.log('Redirect: ', redirect)}
        {redirect ? <Redirect to="/blogs" /> : showBlogDetails()}
      </div>
    </div>
  )
}

export default Blog