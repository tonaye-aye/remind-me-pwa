//import react
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

export default function Header({
  reminders,
  setReminders,
  titleText,
  setTitleText,
  bodyText,
  setBodyText
}) {
  // history
  const history = useHistory()

  // state stuff
  const [error, seterror] = useState({
    title: false,
    body: false,
    message: 'Cannot be blank'
  })

  // handle input text
  const titleHandler = (e) => {
    setTitleText(e.target.value)
  }
  const bodyHandler = (e) => {
    setBodyText(e.target.value)
  }

  const checkKey = (e) => {
    if (e.key === 'Enter') {
      submitReminder(e)
    }
  }
  // submit new todo list item
  const submitReminder = (e) => {
    e.preventDefault()
    if (bodyText === '' || titleText === '') {
      seterror({ ...error, [e.target.name]: true })
    } else {
      setReminders([...reminders, { title: titleText, body: bodyText }])
      setTitleText('')
      setBodyText('')
      history.push('/')
    }
  }

  return (
    <Container className="container">
      <form noValidate autoComplete="off">
        <Box className="nav-edit">
          <Button
            variant="contained"
            color="primary"
            className="install"
            size="small"
            startIcon={<SaveIcon />}
            onClick={submitReminder}
          >
            Save
          </Button>
        </Box>
        <TextField
          className="input-field"
          autoFocus
          label="Title..."
          variant="filled"
          fullWidth={true}
          value={titleText}
          onChange={titleHandler}
          onKeyPress={checkKey}
          style={{ marginBottom: '0.75rem' }}
          error={error.title}
          helperText={error.title && error.message}
        />
        <TextField
          className="input-field"
          label="Body..."
          variant="filled"
          multiline
          rows={5}
          fullWidth={true}
          value={bodyText}
          onChange={bodyHandler}
          onKeyPress={checkKey}
          error={error.body}
          helperText={error.body && error.message}
        />
      </form>
    </Container>
  )
}
