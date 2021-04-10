//import react
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

export default function Edit({
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
  const [titleStore, setTitleStore] = useState('')
  const [bodyStore, setBodyStore] = useState('')
  const [error, seterror] = useState({
    title: false,
    body: false,
    message: 'Cannot be blank'
  })

  // get initial note, and save in case of cancel edit
  useEffect(() => {
    setTitleStore(titleText)
    setBodyStore(bodyText)
  }, [])

  // handle input texts
  const titleHandler = (e) => {
    setTitleText(e.target.value)
    seterror({ ...error, title: false })
  }
  const bodyHandler = (e) => {
    setBodyText(e.target.value)
    seterror({ ...error, body: false })
  }

  // cancel edit handler
  const cancelHandler = () => {
    setReminders([...reminders, { title: titleStore, body: bodyStore }])
    setTitleText('')
    setBodyText('')
    history.push('/')
  }

  // submit on enter key
  // const checkKey = (e) => {
  //   if (e.key === 'Enter') {
  //     submitReminder(e)
  //   }
  // }
  // submit new todo list item
  const submitReminder = (e) => {
    e.preventDefault()
    if (bodyText === '') {
      seterror({ ...error, body: true })
    } else if (titleText === '') {
      seterror({ ...error, title: true })
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
            onClick={submitReminder}
          >
            Save
          </Button>
        </Box>
        <TextField
          className="input-field"
          autoFocus
          label="Heading"
          variant="filled"
          fullWidth={true}
          value={titleText}
          onChange={titleHandler}
          //onKeyPress={checkKey}
          style={{ marginBottom: '0.75rem' }}
          error={error.title}
          helperText={error.title && error.message}
        />
        <TextField
          className="input-field"
          label="Notes"
          variant="filled"
          multiline
          rows={5}
          fullWidth={true}
          value={bodyText}
          onChange={bodyHandler}
          //onKeyPress={checkKey}
          error={error.body}
          helperText={error.body && error.message}
        />
      </form>
    </Container>
  )
}
