import React from 'react'

const Login = (props) => {
  return (
    <div>
      <form name="login-form" onSubmit={props.onSubmit}>
        <div>Username: <input id='username' name='username' value={props.username} onChange={props.onChange}/></div>
        <div>Password: <input id='password' name='password' value={props.password} onChange={props.onChange} type="password"/></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default Login