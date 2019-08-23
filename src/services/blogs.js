import axios from 'axios'

const baseUrl = '/api/blogs'
const baseUsersUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAllUsers = async() => {
  const response = await axios.get(baseUsersUrl)
  return response.data
}

const addBlog = (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  return axios
    .post(baseUrl, newBlog, config)
    .then(response => response.data)
    .catch(error => {
      console.log('Error in blogs.js', error.response.data)
      return error.response.data
    })
}

const likeBlog = (blog) => {
  const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
  return axios
    .put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate)
    .then(response => response.data)
    .catch(error => {
      console.log('Error in likeBlog of blogs.js', error.response.data)
      return error.response.data
    })
}

const addCommentToBlog = (blog, comment) => {
  const blogToUpdate = { ...blog, comments: blog.comments.concat(comment), user: blog.user.id }
  return axios
    .put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate)
    .then(response => response.data)
    .catch(error => {
      console.log('Error in addCommenToBlog of blogs.js', error.response.data)
      return error.response.data
    })
}

const getBlog = (blog) => {
  return axios
    .get(`${baseUrl}/${blog.id}`)
    .then(response => response.data)
    .catch(error => error.response.data)
}

const removeBlog = (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  if (window.confirm('do you really want to delete the blog?')) {
    console.log('About to remove blog!!!')
    return axios
      .delete(`${baseUrl}/${blog.id}`, config)
      .then(response => response.data)
      .catch(error => error.response.data)
  }
}

export default { getAll, getAllUsers, addBlog, likeBlog, addCommentToBlog, getBlog, removeBlog }