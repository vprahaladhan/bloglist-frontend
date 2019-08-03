import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // useEffect(() => {
  //   blogsService
  //   .getAll()
  //   .then(result => setBlogs(result))}, [])

  const showAllBlogs = () => {
    blogsService
    .getAll()
    .then(result => setBlogs(result))
    return blogs.map(blog => <li key={blog.id}><Blog blog={blog}/></li>)
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
          setErrorMsg(response.error)
          setTimeout(() => setErrorMsg(null), 5000)  
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
  //   await blogsService.addBlog(blog, `bearer ${user.token}`)
  //   // setBlogs(blogs.concat(newBlog))
  // }

  const onClick = (event) => {
    const blog = { title, author, url }
    clearBlogInputFields()
    // const newBlog = 
    blogsService
      .addBlog(blog, `bearer ${user.token}`)
      .then(response => {
          if (response.hasOwnProperty('error')) {
            setErrorMsg(response.error)
            setTimeout(() => setErrorMsg(null), 5000)  
        }
      })
    // setBlogs(blogs.concat(newBlog))
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

  const blog = {title, author, url}

  return (
    <div className="App">
      <h1>Blogs</h1>
      {!window.localStorage.getItem('user') ? 
        <Login username={username} password={password} onChange={onChange} onSubmit={handleLogin} /> :
        <>
          <p>
            User {JSON.parse(window.localStorage.getItem('user')).name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <p><h1>Create New Blog</h1></p>
          <CreateBlog blog={blog} onChange={onChange} onClick={onClick}/>
          <ul style={{listStyle: 'none', paddingLeft: 0}}>{showAllBlogs()}</ul>
          <p>Total blogs: {blogs.length}</p>
        </>
      }
      <p>{errorMsg ? errorMsg : ''}</p>
    </div>
  )
}

export default App