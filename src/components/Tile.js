//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import VisibilityIcon from '@material-ui/icons/Visibility'

export default function Tile({ reminders, setReminders, reminder }) {
  const history = useHistory()

  // delete handler for todo items
  const deleteHandler = () => {
    setReminders(reminders.filter((item) => item.id !== reminder.id))
  }

  return (
    <Box className="note-tile">
      <Typography variant="body2">{reminder.title}</Typography>
      <Box>
        <Button
          variant="contained"
          size="small"
          onClick={() => history.push(`/reminder/${reminder.id}`)}
          endIcon={<VisibilityIcon />}
          style={{ marginRight: '.5rem' }}
        >
          Read
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={deleteHandler}
          endIcon={<DeleteOutlineIcon />}
        >
          Delete
        </Button>
      </Box>
    </Box>
  )
}
