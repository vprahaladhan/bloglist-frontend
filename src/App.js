import React, { useState } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import PropTypes from 'prop-types'
import { useResource } from './hooks/index'

export default function App() {
  const [ blogs, blogService ] = useResource('http://localhost:3003/api/blogs')
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setURL ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ msgColor, setMsgColor ] = useState(null)
  const [ visible, setVisible ] = useState(true)

  const showAllBlogs = () => {
    blogService.getAll()
    return blogs.map(blog => <li key={blog.id}><Blog blog={blog} user={user} /></li>)
  }

  const onChange = (event) => {
    switch(event.target.name) {
    case 'title'  : setTitle(event.target.value)
      break
    case 'author' : setAuthor(event.target.value)
      break
    case 'url'    : setURL(event.target.value)
      break
    default       :
    }
  }

  const onClick = () => {
    const blog = { title, author, url }
    blogService.create(blog)
    clearBlogInputFields()
  }

  const setVisibility = visibility => visibility ? '' : 'none'

  const showOrHideForm = () => {
    setVisible(!visible)
  }

  const clearBlogInputFields = () => {
    setTitle('')
    setAuthor('')
    setURL('')
  }

  const displayMessage = (msg, color) => {
    setMessage(msg)
    setMsgColor(color)
    setTimeout(() => setMessage(null), 2000)
  }

  const blog = { title, author, url }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <div className="App">
      {!user ?
        <div>
          <h1>Log in to App</h1>
          {message ? <Notification message={message} msgColor={msgColor} /> : <></>}
          <Login displayMessage={displayMessage} setUser={(response) => setUser(response)}/>
        </div> :
        <div>
          <h1>Blogs</h1>
          {message ? <Notification message={message} msgColor={msgColor} /> : <></>}
          <p>
            User {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <div style={{ display: setVisibility(visible) }}>
            <button name='show-form' onClick={showOrHideForm}>Show Form</button>
          </div>
          <div style={{ display: setVisibility(!visible) }}>
            <h1><p>Create New Blog</p></h1>
            <CreateBlog blog={blog} onChange={onChange} onClick={onClick} showOrHideForm={showOrHideForm}/>
          </div>
          <div>
            <ul className='blogs' style={{ listStyle: 'none', paddingLeft: 0 }}>
              {showAllBlogs()}
            </ul>
            <p>Total blogs: {blogs.length}</p>
          </div>
        </div>
      }
    </div>
  )
}

CreateBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  showOrHideForm: PropTypes.func.isRequired
}