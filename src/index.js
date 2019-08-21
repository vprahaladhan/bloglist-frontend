
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Apple from './App'
import blogsReducer from './reducers/blogsReducer'

const store = createStore(blogsReducer)

const renderApp = () => {
  ReactDOM.render(<Apple store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)