//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export default function Reminder({
  setTitleText,
  setBodyText,
  reminder,
  reminders,
  setReminders
}) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setReminders(reminders.filter((item) => item.id !== reminder.id))
    history.push('/')
  }

  //edit note
  const editHandler = () => {
    setTitleText(reminder.title)
    setBodyText(reminder.body)
    history.push('/edit')
    setReminders(reminders.filter((item) => item.id !== reminder.id))
  }

  return (
    <Container className="container">
      <Box className="nav">
        <Button
          onClick={() => history.push('/')}
          size="small"
          className="install"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Box>
          <Button
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={editHandler}
            style={{ marginRight: '.5rem' }}
          >
            Edit
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
      </Box>
      <Box className="reminder">
        <Typography variant="body1">
          <span className="pre-title">Title:</span>
          <br /> {reminder.title}
        </Typography>
      </Box>
      <Box className="reminder">
        <Typography variant="body1">
          <span className="pre-title">Body:</span>
          <br /> {reminder.body}
        </Typography>
      </Box>
    </Container>
  )
}
