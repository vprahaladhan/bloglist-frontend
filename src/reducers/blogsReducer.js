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
  case 'ADD_NEW_BLOG'       : return { ...state, blogs: state.blogs.concat(action.data) }
  case 'REMOVE_BLOG'        : return { ...state, blogs: state.blogs.filter(blog => blog.id !== action.data.id) }
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