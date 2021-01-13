//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import LaunchIcon from '@material-ui/icons/Launch'

export default function Home({ todos, setTodos, todo, text }) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id))
  }

  return (
    <Box className="note-tile">
      <Typography variant="body1">{text}</Typography>
      <Box>
        <Button size="small" onClick={() => history.push(`/note/${todo.id}`)}>
          <LaunchIcon fontSize="small" />
        </Button>
        <Button
          className="delete-button"
          variant="contained"
          color="secondary"
          size="small"
          onClick={deleteHandler}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </Box>
    </Box>
  )
}
