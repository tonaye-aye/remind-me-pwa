//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Container, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export default function View({
  setTitleText,
  setBodyText,
  reminder,
  reminders,
  setReminders
}) {
  const history = useHistory()

  //edit note
  const editHandler = () => {
    setTitleText(reminder.title)
    setBodyText(reminder.body)
    history.push('/create')
    setReminders(reminders.filter((item) => item.id !== reminder.id))
  }

  return (
    <Container className="container">
      <Box className="nav">
        <Button
          variant="contained"
          onClick={() => history.push('/')}
          size="small"
          className="install"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={editHandler}
          style={{ marginRight: '.5rem' }}
        >
          Edit
        </Button>
      </Box>
      <Box className="reminder">
        <Typography variant="overline" className="pre-title">
          Title
        </Typography>
        <Typography variant="body1">{reminder.title}</Typography>
      </Box>
      <Box className="reminder">
        <Typography variant="overline" className="pre-title">
          Details
        </Typography>
        <Typography variant="body1">{reminder.body}</Typography>
      </Box>
    </Container>
  )
}
