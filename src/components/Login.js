import React from 'react'

const Login = ({username, password, onSubmit, onChange}) => {
    return (
        <div>
            <form name="login-form" onSubmit={onSubmit}> 
                Username: <input name='username' value={username} onChange={onChange}/><br/>
                Password: <input name='password' value={password} onChange={onChange} type="password"/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login