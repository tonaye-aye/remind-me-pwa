//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

export default function Header({ todos, setTodos, inputText, setInputText }) {
  const history = useHistory()

  // handle input text
  const textHandler = (e) => {
    setInputText(e.target.value)
  }

  const checkKey = (e) => {
    if (e.key === 'Enter') {
      submitReminder(e)
    }
  }
  // submit new todo list item
  const submitReminder = (e) => {
    e.preventDefault()
    setTodos([...todos, { text: inputText, completed: false }])
    setInputText('')
    history.push('/')
  }

  return (
    <Container className="container">
      <form noValidate autoComplete="off">
        <Box className="nav">
          <Button
            onClick={() => history.push('/')}
            size="small"
            className="install"
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
          autoFocus
          className="text-area"
          label="Remind..."
          variant="filled"
          fullWidth={true}
          value={inputText}
          onChange={textHandler}
          onKeyPress={checkKey}
        />
      </form>
    </Container>
  )
}
