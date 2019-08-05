import React from 'react'

const Login = ({ username, password, onSubmit, onChange }) => {
  return (
    <div>
      <form name="login-form" onSubmit={onSubmit}>
        <div>Username: <input name='username' value={username} onChange={onChange}/></div>
        <div>Password: <input name='password' value={password} onChange={onChange} type="password"/></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default Login