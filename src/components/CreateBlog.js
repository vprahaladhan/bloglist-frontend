import React from 'react'

const CreateBlog = ({ blog, onChange, onClick, showOrHideForm }) => {
  return (
    <div>
      <div>
          Title: <input id='title' type='text' placeholder="Type title..." value={blog.title} onChange={onChange} /><br/>
      </div>
      <div>
          Author: <input id='author' type='text' placeholder="Type author..." value={blog.author} onChange={onChange}/><br/>
      </div>
      <div>
          URL: <input id='url' type='text' placeholder="Type URL..." value={blog.url} onChange={onChange}/><br/>
      </div>
      <div>
        <button className="ui button" name='create-blog' onClick={onClick}>Create Blog</button>
        <button className="ui button" name='hide-form' onClick={showOrHideForm}>Hide Form</button>
      </div>
    </div>
  )
}

export default CreateBlog