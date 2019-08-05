import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'

function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setURL ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ msgColor, setMsgColor ] = useState(null)
  const [ visible, setVisible ] = useState(true)
  
  // useEffect(() => {
  //   blogService
  //   .getAll()
  //   .then(result => setBlogs(result))}, [])

  const showAllBlogs = () => {
    blogService
    .getAll()
    .then(result => setBlogs(result.sort((blog1, blog2) => blog2.likes - blog1.likes)))
    return blogs.map(blog => <li key={blog.id}><Blog blog={blog} /></li>)
  }

  const onChange = (event) => {
    switch(event.target.name) {
      case 'title'    : setTitle(event.target.value)
                        break
      case 'author'   : setAuthor(event.target.value)
                        break
      case 'url'      : setURL(event.target.value)
                        break
      case 'username' : setUsername(event.target.value)
                        break
      case 'password' : setPassword(event.target.value)
                        break
      default         :
    }
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const loggedInUser = await loginService.login({username, password})
  //     window.localStorage.setItem('user', JSON.stringify(loggedInUser))
  //     clearLoginInputFields()
  //     setUser(loggedInUser)
  //   }
  //   catch(error) {
  //     setErrorMsg('Wrong credentials')
  //     setTimeout(() => setErrorMsg(null), 5000)
  //   }
  // }

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login({username, password})
      .then(response => {
        if (!response.hasOwnProperty('error')) {
          window.localStorage.setItem('user', JSON.stringify(response))
          clearLoginInputFields()
          setUser(response)
        }
        else {
          displayMessage(response.error, 'red')
        }
      })
  }
      
  const handleLogout = (event) => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  // const onClick = async (event) => {
  //   const blog = { title, author, url }
  //   clearBlogInputFields()
  //   // const newBlog = 
  //   await blogService.addBlog(blog, `bearer ${user.token}`)
  //   // setBlogs(blogs.concat(newBlog))
  // }

  const onClick = (event) => {
    const blog = { title, author, url }
    clearBlogInputFields()
    // const newBlog = 
    blogService
      .addBlog(blog, `bearer ${user.token}`)
      .then(response => {
          if (response.hasOwnProperty('error')) {
            displayMessage(response.error, 'red')
          }
          else {
            const msg = `a new blog ${response.title} by ${response.author} has been added`
            displayMessage(msg, 'green')
          }
      })
    // setBlogs(blogs.concat(newBlog))
  }

  const showOrHideForm = () => {
    setVisible(!visible)
  }

  const clearBlogInputFields = () => {
    setTitle('')
    setAuthor('')
    setURL('')
  }

  const clearLoginInputFields = () => {
    setUsername('')
    setPassword('')
  }

  const displayMessage = (msg, color) => {
    setMessage(msg)
    setMsgColor(color)
    setTimeout(() => setMessage(null), 5000) 
  }
  
  const setVisibility = visibility => visibility ? '' : 'none'
  
  const blog = {title, author, url}

  return (
    <div className="App">
      {!window.localStorage.getItem('user') ? 
        <div>
          <h1>Log in to App</h1>
          {message ? <Notification message={message} msgColor={msgColor} /> : <></>}
          <Login username={username} password={password} onChange={onChange} onSubmit={handleLogin} />
        </div> :
        <div>
          <h1>Blogs</h1>
          {message ? <Notification message={message} msgColor={msgColor} /> : <></>}
          <p>
            User {JSON.parse(window.localStorage.getItem('user')).name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <div style={{display: setVisibility(visible)}}>
            <button name='show-form' onClick={showOrHideForm}>Show Form</button>
          </div>
          <div style={{display: setVisibility(!visible)}}>
            <h1><p>Create New Blog</p></h1>
            <CreateBlog blog={blog} onChange={onChange} onClick={onClick} showOrHideForm={showOrHideForm}/>
          </div>
          <div>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>{showAllBlogs()}</ul>
            <p>Total blogs: {blogs.length}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default App