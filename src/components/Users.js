import React from 'react'
import {  Link, Route } from 'react-router-dom'
import User from './User'

const AllUsers = ({ store }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {store.getState().users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const Users = ({ store }) => {
  return (
    <div>
      <Route exact path="/users" render={() => <AllUsers store={store} />} />
      {/* <Route path="/users/:id" render={({ match }) => {
        const user = store.getState().users.find(user => user.id === match.params.id)
        return <User user={user} />
      }
      } /> */}
    </div>
  )
}

export default Users