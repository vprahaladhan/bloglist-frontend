import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

// const addBlog = async (newBlog, token) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.post(baseUrl, newBlog, config)
//   return response.data
// }

const addBlog = (newBlog, token) => {
  const config = {
    headers: { Authorization: token },
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
  const blogToUpdate = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  }

  return axios
    .put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate)
    .then(response => response.data)
    .catch(error => {
      console.log(`Error in likeBlog of blogs.js ${error.response.data}`)
      return error.response.data
    })
}

const getBlog = (blog) => {
  return axios
    .get(`${baseUrl}/${blog.id}`)
    .then(response => response.data)
    .catch(error => error.response.data)
}

const removeBlog = (blog, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` }
  }
  if (window.confirm('do you really want to delete the blog?')) {
    console.log('About to remove blog!!!')
    return axios
      .delete(`${baseUrl}/${blog.id}`, config)
      .then(response => response.data)
      .catch(error => error.response.data)
  }
}

export default { getAll, addBlog, likeBlog, getBlog, removeBlog }