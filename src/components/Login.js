import React from 'react'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import { setLoggedInUser, showNotification } from '../reducers/blogsReducer'

const Login = ({ store }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login({ username: username.value, password: password.value })
      .then(response => {
        if (!response.hasOwnProperty('error')) {
          console.log('User: ', JSON.stringify(response))
          window.localStorage.setItem('user', JSON.stringify(response))
          store.dispatch(setLoggedInUser(response))
        }
        else {
          store.dispatch(showNotification(response.error, 'red'))
          username.reset()
          password.reset()
          setTimeout(() => store.dispatch(showNotification('', '')), 2000)
        }
      })
  }

  return (
    <div>
      <form name="login-form" onSubmit={handleLogin}>
        <div>Username: <input {...{ ...username, reset: undefined }} /></div>
        <div>Password: <input {...{ ...password, reset: undefined }} /></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default Login