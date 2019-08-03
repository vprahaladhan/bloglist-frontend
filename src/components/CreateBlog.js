import React from 'react'

const CreateBlog = ({blog, onChange, onClick}) => {
    return (
        <div>
            Title: <input name='title' placeholder="Type title..." value={blog.title} onChange={onChange}/><br/>
            Author: <input name='author' placeholder="Type author..." value={blog.author} onChange={onChange}/><br/>
            URL: <input name='url' placeholder="Type URL..." value={blog.url} onChange={onChange}/><br/>
            <button onClick={onClick}>Create</button>
        </div>
    )
}

export default CreateBlog 