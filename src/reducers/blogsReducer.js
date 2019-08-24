import blogsService from '../services/blogs'

export const displayAllBlogs = async () => {
  return {
    type: 'SHOW_ALL_BLOGS',
    data: sortBlogsByLikes(await blogsService.getAll())
  }
}

export const displayAllUsers = async () => {
  return {
    type: 'SHOW_ALL_USERS',
    data: await blogsService.getAllUsers()
  }
}

export const addLikesToBlog = async (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: await blogsService.likeBlog(blog)
  }
}

export const addCommentToBlog = async (blog, comment) => {
  return {
    type: 'ADD_COMMENT',
    data: await blogsService.addCommentToBlog(blog, comment)
  }
}

export const createBlog = async (blog, token) => {
  return {
    type: 'ADD_NEW_BLOG',
    data: await blogsService.addBlog(blog, token)
  }
}

export const removeBlog = async (blog, token) => {
  await blogsService.removeBlog(blog, token)
  return {
    type: 'REMOVE_BLOG',
    data: blog
  }
}

export const setLoggedInUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    data: user
  }
}

export const showNotification = (message, messageColor, status) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message, messageColor, status }
  }
}

const sortBlogsByLikes = blogs => blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)

const notification = { message: '', messageColor: '', status: '' }

const reducer = (state = { blogs: [], users: [], user: null, notification: notification }, action) => {
  switch(action.type) {
  case 'SHOW_ALL_BLOGS'     : return { ...state, blogs: action.data }
  case 'LIKE_BLOG'          :
  {
    const blogs = sortBlogsByLikes(state.blogs.map(blog => blog.id !== action.data.id ? blog : action.data))
    return { ...state, blogs: blogs }
  }
  case 'ADD_NEW_BLOG'       : {
    const newState = { ...state, blogs: sortBlogsByLikes(state.blogs.concat(action.data)) }
    const newUser = newState.users.find(user => user.username === state.user.username)
    newUser.blogs = newUser.blogs.concat(action.data)
    return newState
  }
  case 'REMOVE_BLOG'        : {
    const newState = { ...state, blogs: sortBlogsByLikes(state.blogs.filter(blog => blog.id !== action.data.id)) }
    const newUser = newState.users.find(user => user.blogs.find(blog => blog.id === action.data.id))
    newUser.blogs = newUser.blogs.filter(blog => blog.id !== action.data.id)
    return { ...newState, users: newState.users.map(user => user.id !== newUser.id ? user : newUser) }
  }
  case 'ADD_COMMENT'        :
  {
    const blogs = sortBlogsByLikes(state.blogs.map(blog => blog.id !== action.data.id ? blog : action.data))
    return { ...state, blogs: blogs }
  }
  case 'SHOW_ALL_USERS'     : return { ...state, users: action.data }
  case 'SET_CURRENT_USER'   : return { ...state, user: action.data }
  case 'SHOW_NOTIFICATION'  : return { ...state, notification: action.data }
  default                   : return state
  }
}

export default reducer