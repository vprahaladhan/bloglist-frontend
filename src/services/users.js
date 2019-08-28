import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const addUser = (user) => {
  console.log(`URL: ${baseUrl}`)
  return axios
    .post(baseUrl, user)
    .then( response => response.data )
    .catch( error => {
      console.log('Error in users.js', error.response.data)
      return error.response.data})
}

export default { addUser }