import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import PropTypes from 'prop-types'
import { displayAllBlogs, setLoggedInUser, createBlog, showNotification } from './reducers/blogsReducer'

export default function App({ store }) {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setURL ] = useState('')
  const [ visible, setVisible ] = useState(true)

  useEffect( () => {
    async function fetchBlogs() {
      store.dispatch(await displayAllBlogs())
    }
    fetchBlogs()
  }, [store])

  const blog = { title, author, url }

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

  const onClick = async () => {
    const blog = { title, author, url }
    store.dispatch(await createBlog(blog, JSON.parse(window.localStorage.getItem('user')).token))
    store.dispatch(showNotification(`You created a new blog - ${blog.title}`, 'green'))
    setTimeout(() => store.dispatch(showNotification('', '')), 2000)
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

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    store.dispatch(setLoggedInUser(null))
  }

  return (
    <div className="App">
      {!window.localStorage.getItem('user') ?
        <div>
          <h1>Log in to App</h1>
          {store.getState().notification.message ? <Notification message={store.getState().notification.message} msgColor={store.getState().notification.messageColor} /> : <></>}
          <Login store={store} />
        </div> :
        <div>
          <h1>Blogs</h1>
          {store.getState().notification.message ? <Notification message={store.getState().notification.message} msgColor={store.getState().notification.messageColor} /> : <></>}
          <p>
            User {JSON.parse(window.localStorage.getItem('user')).name} logged in
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
              {store.getState().blogs.map(blog =>
                <li key={blog.id}>
                  <Blog blog={blog} user={window.localStorage.getItem('user')} store={store} />
                </li>
              )}
            </ul>
            <p>Total blogs: {store.getState().blogs.length}</p>
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