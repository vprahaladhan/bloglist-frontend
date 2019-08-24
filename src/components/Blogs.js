import React from 'react'
import { Link } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import { Table } from 'semantic-ui-react'

const Blogs = ({ store, setVisibility, visible, blog, onChange, onClick, showOrHideForm }) => {

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={{ display: setVisibility(visible) }}>
        <button className="ui button" name='show-form' onClick={showOrHideForm}>Show Form</button>
      </div>
      <div style={{ display: setVisibility(!visible) }}>
        <h1><p>Create New Blog</p></h1>
        <CreateBlog blog={blog} onChange={onChange} onClick={onClick} showOrHideForm={showOrHideForm}/>
      </div>
      <div>
        <Table striped celled>
          <Table.Body>
            {/* <ul className='blogs' style={{ listStyle: 'none', paddingLeft: 0 }}> */}
            {store.getState().blogs.map(blog =>
              <Table.Row key={blog.id} style={blogStyle}>
                {/* <Blog blog={blog} user={window.localStorage.getItem('user')} store={store} /> */}
                <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></Table.Cell>
              </Table.Row>
            )}
            {/* </ul> */}
          </Table.Body>
        </Table>
        <p>Total blogs: {store.getState().blogs.length}</p>
      </div>
    </div>
  )
}

export default Blogs