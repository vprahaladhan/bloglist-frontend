import React from 'react'
import { useField } from '../hooks'
import loginService from '../services/login'

const Login = ({ displayMessage, setUser }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login({ username: username.value, password: password.value })
      .then(response => {
        if (!response.hasOwnProperty('error')) {
          window.localStorage.setItem('user', JSON.stringify(response))
          console.log(window.localStorage.getItem('user'))
          setUser(response)
        }
        else {
          displayMessage(response.error, 'red')
        }
      })
      .finally(() => {
        clearLoginInputFields()
      })
  }

  const clearLoginInputFields = () => {
    username.reset()
    password.reset()
  }

  return (
    <div>
      <form name="login-form" onSubmit={handleLogin}>
        <div>Username: <input {...username} /></div>
        <div>Password: <input {...password} /></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default Login