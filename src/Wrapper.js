import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NoteForm from './NoteForm'

const Wrapper = (props) => {

  const onChange = (event) => {
    props.state.value = event.target.value
  }

  return (
    <NoteForm
      value={props.state.value}
      onSubmit={props.onSubmit}
      handleChange={onChange}
    />
  )
}