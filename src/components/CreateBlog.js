import React from 'react'

const CreateBlog = ({blog, onChange, onClick, showOrHideForm}) => {
    return (
        <div>
            Title: <input name='title' placeholder="Type title..." value={blog.title} onChange={onChange}/><br/>
            Author: <input name='author' placeholder="Type author..." value={blog.author} onChange={onChange}/><br/>
            URL: <input name='url' placeholder="Type URL..." value={blog.url} onChange={onChange}/><br/>
            <button name='create-blog' onClick={onClick}>Create Blog</button>
            <button name='hide-form' onClick={showOrHideForm}>Hide Form</button>
        </div>
    )
}

export default CreateBlog 