import React from 'react'
import { Link } from 'react-router-dom'
import { useField } from '../hooks/index'
import usersService from '../services/users'
import { setLoggedInUser, showNotification } from '../reducers/blogsReducer'
import { Button, Menu } from 'semantic-ui-react'

const Signup = ({ store }) => {
  const username = useField('text')
  const fullName = useField('text')
  const password = useField('password')
  let usernameRef = React.createRef()

  const registerUser = (event) => {
    event.preventDefault()
    usernameRef.current.focus()
    console.log('User in Signup.js => ')
    usersService
      .addUser({ username: username.value, name: fullName.value, password: password.value })
      .then(response => {
        if (!response.hasOwnProperty('error')) {
          console.log('User in Signup.js: ', JSON.stringify(response))
          const message = 'Successfully signed up! Goto login.'
          store.dispatch(showNotification(message, 'green', 'success'))
          console.log('State in Signup.js: ', store.getState())
          setTimeout(() => store.dispatch(showNotification('', '', '')), 2000)
          clearInputFields()
        }
        else {
          store.dispatch(showNotification(response.error + '! please try again.', 'red', 'negative'))
          setTimeout(() => store.dispatch(showNotification('', '', '')), 2000)
          clearInputFields()
        }
      })
  }

  const clearInputFields = () => {
    username.reset()
    fullName.reset()
    password.reset()
  }

  return (
    <div>
      <div>
        <Menu>
          <Menu.Item><Link to='/'>login</Link></Menu.Item>
        </Menu>

        <h1>Register</h1>
        <form className="ui form" name="login-form" onSubmit={registerUser}>
          <div className="field">
            <label>Username:</label>
            <input ref={usernameRef} id='username' {...{ ...username, reset: undefined }} />
          </div>
          <div className="field">
            <label>Full Name:</label>
            <input id='fullname' {...{ ...fullName, reset: undefined }} />
          </div>
          <div className="field">
            <label>Password:</label>
            <input id='password' {...{ ...password, reset: undefined }} />
          </div>
          <Button size='large' color='blue' type="submit">Register</Button>
        </form>
      </div>
    </div>
  )
}

export default Signup