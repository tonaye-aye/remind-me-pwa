//import react
import React from 'react'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function Home({ todos, setTodos, todo, text }) {
  // delete handler for todo items
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id))
  }

  return (
    <Box className="reminder">
      <Typography variant="body1">{text}</Typography>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={deleteHandler}
      >
        <DeleteOutlineIcon fontSize="small" />
      </Button>
    </Box>
  )
}
