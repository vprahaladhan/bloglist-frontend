import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { Container, Message, Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import { displayAllBlogs, displayAllUsers } from './reducers/blogsReducer'
import { setLoggedInUser, createBlog, showNotification } from './reducers/blogsReducer'
import styled from 'styled-components'

export default function App({ store }) {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setURL ] = useState('')
  const [ visible, setVisible ] = useState(true)

  useEffect( () => {
    async function fetchBlogs() {
      store.dispatch(await displayAllBlogs())
      store.dispatch(await displayAllUsers())
    }
    fetchBlogs()
  }, [store])

  const blog = { title, author, url }

  const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
  `
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
    store.dispatch(showNotification(`You created a new blog - ${blog.title}`, 'green', 'success'))
    setTimeout(() => store.dispatch(showNotification('', '', '')), 2000)
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
    setVisible(true)
  }

  return (
    <Container>
      <Router>
        <div className="App">
          {!window.localStorage.getItem('user') ?
            <div>
              <h1>Log in to App</h1>
              {store.getState().notification.message ?
                <Message color={store.getState().notification.messageColor}>{store.getState().notification.message}</Message> : <></>}
              {/* <Notification message={store.getState().notification.message} msgColor={store.getState().notification.messageColor} /> */}
              <Login store={store} />
              <Redirect to="/" />
            </div> :
            <div>
              <Menu>
                <Menu.Item><Link style={{ padding: 5 }} to="/blogs">blogs</Link></Menu.Item>
                <Menu.Item><Link style={{ padding: 5 }} to="/users">users</Link></Menu.Item>
                <Menu.Item>
                  User {JSON.parse(window.localStorage.getItem('user')).name} logged in <button onClick={handleLogout}>Logout</button>
                </Menu.Item>
              </Menu>
              {store.getState().notification.message ?
                <Message color={store.getState().notification.messageColor}>{store.getState().notification.message}</Message> : <></>}
              {/* <Notification message={store.getState().notification.message} msgColor={store.getState().notification.messageColor} /> */}
              <div>
                <h1>Blog app</h1>
                {store.getState().notification.message ? <Notification message={store.getState().notification.message} msgColor={store.getState().notification.messageColor} /> : <></>}
              </div>
              <Route exact path="/" render={() => <Blogs store={store} setVisibility={setVisibility} visible={visible} blog={blog} onChange={onChange} onClick={onClick} showOrHideForm={showOrHideForm} />} />
              <Route exact path="/blogs"  render={() => <Blogs store={store} setVisibility={setVisibility} visible={visible} blog={blog} onChange={onChange} onClick={onClick} showOrHideForm={showOrHideForm} />} />
              <Route path="/blogs/:id" render={({ match }) => {
                return <Blog
                  blog={store.getState().blogs.find(blog => blog.id === match.params.id)}
                  user={JSON.parse(window.localStorage.getItem('user'))}
                  store={store} />
              }} />
              <Route exact path="/users"  render={() => <Users store={store} />} />
              <Route path="/users/:id" render={({ match }) => {
                const user = store.getState().users.find(user => user.id === match.params.id)
                return <User user={user} />
              }
              } />
            </div>
          }
        </div>
      </Router>
    </Container>
  )
}

CreateBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  showOrHideForm: PropTypes.func.isRequired
}