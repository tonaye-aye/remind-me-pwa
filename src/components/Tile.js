//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import LaunchIcon from '@material-ui/icons/Launch'

export default function Tile({ reminders, setReminders, reminder, text }) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setReminders(reminders.filter((item) => item.id !== reminder.id))
  }

  return (
    <Box className="note-tile">
      <Typography variant="body1">{reminder.title}</Typography>
      <Box>
        <Button
          size="small"
          onClick={() => history.push(`/reminder/${reminder.id}`)}
        >
          <LaunchIcon fontSize="small" />
        </Button>
        <Button
          style={{ marginLeft: '.5rem' }}
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
