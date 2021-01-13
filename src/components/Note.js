//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function Header({ note, todos, setTodos }) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== note.id))
    history.push('/')
  }

  return (
    <Container className="container">
      <Box className="nav">
        <Button
          onClick={() => history.push('/')}
          size="small"
          className="install"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </Box>
      <Box>{note.text}</Box>
    </Container>
  )
}
