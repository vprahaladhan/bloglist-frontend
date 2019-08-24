import React from 'react'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import { setLoggedInUser, showNotification } from '../reducers/blogsReducer'
import { Button } from 'semantic-ui-react'

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
          store.dispatch(showNotification(response.error + '! please try again.', 'red', 'negative'))
          username.reset()
          password.reset()
          setTimeout(() => store.dispatch(showNotification('', '', '')), 2000)
        }
      })
  }

  return (
    <div>
      <form className="ui form" name="login-form" onSubmit={handleLogin}>
        <div className="field">
          <label>Username:</label>
          <input {...{ ...username, reset: undefined }} />
        </div>
        <div className="field">
          <label>Password:</label>
          <input {...{ ...password, reset: undefined }} />
        </div>
        <Button size='large' color='blue' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Login