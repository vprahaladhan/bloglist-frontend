import React from 'react'

const CreateBlog = ({ blog, onChange, onClick, showOrHideForm }) => {
  return (
    <div>
      <div className="field">
          Title: <input name='title' placeholder="Type title..." value={blog.title} onChange={onChange}/><br/>
      </div>
      <div className="field">
          Author: <input name='author' placeholder="Type author..." value={blog.author} onChange={onChange}/><br/>
      </div>
      <div className="field">
          URL: <input name='url' placeholder="Type URL..." value={blog.url} onChange={onChange}/><br/>
      </div>
      <div>
        <button className="ui button" name='create-blog' onClick={onClick}>Create Blog</button>
        <button className="ui button" name='hide-form' onClick={showOrHideForm}>Hide Form</button>
      </div>
    </div>
  )
}

export default CreateBlog