//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function Reminder({ reminder, reminders, setReminders }) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setReminders(reminders.filter((item) => item.id !== reminder.id))
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
      <Box className="reminder">
        <Typography variant="overline" display="block">
          <span className="pre-title">Title:</span> {reminder.text}
        </Typography>
      </Box>
    </Container>
  )
}