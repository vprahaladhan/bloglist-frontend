import axios from 'axios'

const baseUrl = '/api/login'

const login = (user) => {
  console.log(`URL: ${baseUrl}`)
  return axios
    .post(baseUrl, user)
    .then( response => response.data )
    .catch( error => {
      console.log('Error in login.js', error.response.data)
      return error.response.data})
}

export default { login }