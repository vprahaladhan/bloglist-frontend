import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = (user) => {
  // let resp 
  // try {
  // return (await axios.post(baseUrl, user)).data
  //   return resp.data
  // }
  // catch(error) {
  //   console.log(`Error in login: ${error.resp.data}`)
  //   throw new Error(error)
  // }
  console.log(`URL: ${baseUrl}`)
  return axios
    .post(baseUrl, user)
    .then( response => response.data )
    .catch( error => {
      console.log(`Error in login.js`, error.response.data)
      return error.response.data 
   })
}

export default {login}