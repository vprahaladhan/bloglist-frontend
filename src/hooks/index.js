import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    axios.get(baseUrl).then(response => setResources(response.data.sort((item1, item2) => item2.likes - item1.likes)))
  }

  const create = (resource) => {
    const config = {
      headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('user')).token}` },
    }
    axios
      .post(baseUrl, resource, config)
      .then(response => setResources(resources.concat(response.data)))
      .catch(error => {
        console.log('Error in index.js', error.response.data)
        return error.response.data
      })
  }

  const service = {
    getAll, create
  }

  return ([
    resources, service
  ])
}