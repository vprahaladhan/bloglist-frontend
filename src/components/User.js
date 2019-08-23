import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      {user ?
        <div>
          <div>
            <h1>{user.name}</h1>
          </div>
          <div><h3>blogs added</h3></div>
          <div>
            <ul>
              {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
          </div>
        </div> : null
      }
    </div>
  )
}

export default User