//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import LaunchIcon from '@material-ui/icons/Launch'

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
        <ButtonGroup variant="contained">
          <Button
            size="small"
            onClick={() => history.push(`/reminder/${reminder.id}`)}
            endIcon={<LaunchIcon />}
          >
            Expand
          </Button>
          <Button color="secondary" size="small" onClick={deleteHandler}>
            <DeleteOutlineIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
