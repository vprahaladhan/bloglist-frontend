import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import { setLoggedInUser, showNotification } from '../reducers/blogsReducer'
import { Button, Message } from 'semantic-ui-react'

const Login = ({ store, history }) => {
  const username = useField('text')
  const password = useField('password')
  let usernameRef = React.createRef()

  const handleLogin = (event) => {
    event.preventDefault()
    usernameRef.current.focus()
    console.log('User in Login.js => ')
    loginService
      .login({ username: username.value, password: password.value })
      .then(response => {
        if (!response.hasOwnProperty('error')) {
          console.log('User in Login.js: ', JSON.stringify(response))
          window.localStorage.setItem('user', JSON.stringify(response))
          store.dispatch(setLoggedInUser(response))
          console.log('State in Login.js: ', store.getState())
          history.push('/blogs')
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
      <div>
        <h1>Log in to App</h1>
        {store.getState().notification.message ?
          <Message color={store.getState().notification.messageColor}>{store.getState().notification.message}</Message> : <></>}
        <form className="ui form" name="login-form" onSubmit={handleLogin}>
          <div className="field">
            <label>Username:</label>
            <input ref={usernameRef} id='username' autoFocus {...{ ...username, reset: undefined }} />
          </div>
          <div className="field">
            <label>Password:</label>
            <input id='password' {...{ ...password, reset: undefined }} />
          </div>
          <Button size='large' color='blue' type="submit">Submit</Button>
        </form>
      </div><br/>
      <div>
        Not registered yet? <Link to='/signup'>Signup here</Link>
      </div>
    </div>
  )
}

export default withRouter(Login)