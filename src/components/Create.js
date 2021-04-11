//import react
import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, Typography } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

// customised input fields here, created a custom element
const CustomInput = withStyles((theme) => ({
  input: {
    borderRadius: '4px',
    position: 'relative',
    backgroundColor: '#e9e9e9',
    border: 'none',
    boxShadow:
      '0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.075), 0 8px 8px rgba(0, 0, 0, 0.05), 0 16px 16px rgba(0, 0, 0, 0.025)',
    padding: '1rem 1.2rem .8rem',
    '&::placeholder': {
      fontSize: '0.75rem',
      fontFamily: ['"Nunito"'].join(','),
      fontWeight: 400,
      textTransform: 'uppercase',
      opacity: '0.3'
    }
  }
}))(InputBase)

export default function Create({
  reminders,
  setReminders,
  titleText,
  setTitleText,
  bodyText,
  setBodyText
}) {
  // history
  const history = useHistory()

  // state stuff - store variable in case of cancel
  const [error, seterror] = useState({
    title: false,
    details: false,
    message: 'Please fill out all fields.'
  })
  // get initial state of reminder/note, and save in case of cancel edit
  const refTitle = useRef(titleText)
  const refBody = useRef(bodyText)

  // handle input texts
  const titleHandler = (e) => {
    setTitleText(e.target.value)
    seterror({ ...error, title: false })
  }
  const bodyHandler = (e) => {
    setBodyText(e.target.value)
    seterror({ ...error, details: false })
  }

  // cancel edit handler
  const cancelHandler = () => {
    if (refTitle.current.length > 0 || refBody.current.length > 0) {
      setReminders([
        ...reminders,
        { title: refTitle.current, body: refBody.current }
      ])
    }
    setTitleText('')
    setBodyText('')
    history.push('/')
  }

  // submit on enter key
  const checkKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  // submit new todo list item
  const handleSubmit = (e) => {
    e.preventDefault()
    if (bodyText === '') {
      seterror({ ...error, details: true })
    } else if (titleText === '') {
      seterror({ ...error, title: true })
    } else {
      setReminders([...reminders, { title: titleText, body: bodyText }])
      setTitleText('')
      setBodyText('')
      history.push('/')
    }
  }

  // get current date plus one hour
  // let now = new Date()
  // now.setDate(now.getDate() + 1)
  // let deadline = now.toISOString().substr(0, 16)

  return (
    <Container className="container">
      <form noValidate autoComplete="off">
        <Box className="nav">
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelHandler}
            size="small"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="install"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
        <CustomInput
          autoFocus
          placeholder="Title"
          className="input-field"
          variant="filled"
          fullWidth={true}
          value={titleText}
          onChange={titleHandler}
          onKeyPress={checkKey}
          style={{ marginBottom: '0.3rem' }}
        />
        <CustomInput
          placeholder="Details"
          className="input-field"
          variant="filled"
          multiline
          rows={5}
          fullWidth={true}
          value={bodyText}
          onChange={bodyHandler}
          onKeyPress={checkKey}
        />
        <Typography variant="caption" color="secondary">
          {(error.title || error.details) && error.message}
        </Typography>
      </form>
    </Container>
  )
}
