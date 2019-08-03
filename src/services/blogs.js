import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

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
            console.log(`Error in blogs.js`, error.response.data)
            return error.response.data
          }) 
}

export default { getAll, addBlog }