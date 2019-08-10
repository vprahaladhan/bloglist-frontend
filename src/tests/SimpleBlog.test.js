import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'
import Blog from '../components/Blog'
import Login from '../components/Login'
jest.mock('../services/blogs')
import App from '../App'


const user = {
  token: '',
  username: 'sample',
  name: 'sample'
}

const blog = {
  title: 'Sample blog',
  author: 'Mr. X',
  url:'www.sampleblog.com',
  likes: 100,
  user
}

test('renders details of the blog', () => {

  const component = render( <SimpleBlog blog={blog} /> )

  expect(component.container).toHaveTextContent( 'Sample blog' )

  expect(component.container).toHaveTextContent( 'Mr. X' )

  expect(component.container).toHaveTextContent( 'blog has 100 likes' )
})

test('"like"button is pressed twice', () => {
  const mockHandler = jest.fn()

  const { getByText } = render( <SimpleBlog blog={blog} onClick={mockHandler} /> )

  const button = getByText('like')

  fireEvent.click(button)

  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('blog title & author only shown by default', () => {
  const component = render( <Blog blog={blog} user={user} /> )

  expect(component.container).toHaveTextContent( 'Sample blog' )

  expect(component.container).toHaveTextContent( 'Mr. X' )

  expect(component.container).not.toHaveTextContent( 'www.sampleblog.com' )

  expect(component.container).not.toHaveTextContent( '100' )

  const div = component.container.querySelector('.show-blog-details')

  fireEvent.click(div)

  expect(component.container).toHaveTextContent( 'Sample blog' )

  expect(component.container).not.toHaveTextContent( 'Mr. X' )

  expect(component.container).toHaveTextContent( 'www.sampleblog.com' )

  expect(component.container).toHaveTextContent( '100' )
})

const Wrapper = (props) => {
  const onChange = (event) => {
    if (event.target.name === 'username') {
      props.state.username = event.target.value
    }
    else {
      props.state.password = event.target.value
    }
  }

  return (
    <Login username={props.state.username} password={props.state.password} onSubmit={props.onSubmit} onChange={onChange} />
  )
}

describe('<App /> no user logged in', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    expect(window.localStorage.getItem('user')).toBe(undefined)

    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    // await waitForElement(
    //   () => component.getByText('login')
    // )
  })

  test('<Blog /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn()
    const state = {
      username: 'dummy',
      password: 'dummy'
    }

    const component = render( <Wrapper onSubmit={onSubmit} state={state} /> )

    const username = component.container.querySelector('#username')
    const password = component.container.querySelector('#password')
    const form = component.container.querySelector('form')

    fireEvent.change(username, { target: { value: 'dummy' } })
    fireEvent.change(password, { target: { value: 'dummy' } })
    fireEvent.submit(form)

    expect(onSubmit.mock.calls.length).toBe(1)
    expect(state.username).toBe('dummy')
    expect(state.password).toBe('dummy')
  })
})

describe('<App /> user logged in', () => {
  test('if user logged in, all blogs are rendered', async () => {
    const user = {
      token: '1234567890',
      username: 'dummy',
      name: 'dummy'
    }

    window.localStorage.setItem('user', JSON.stringify(user))

    const component = render( <App /> )

    component.rerender(<App />)

    await waitForElement( () => component.container.querySelector('.blogs') )

    expect(JSON.parse(window.localStorage.getItem('user')).username).toBe('dummy')
    expect(JSON.parse(window.localStorage.getItem('user')).name).toBe('dummy')

    const blogs = component.container.querySelectorAll('.show-blog-details')

    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent('World Peace')
    expect(component.container).toHaveTextContent('IT is fun')
    expect(component.container).toHaveTextContent('Life is good')
  })
})