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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      mb={1}
      className="tile"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">{reminder.title}</Typography>
        <Box ml={1}>
          <Typography variant="caption">
            {reminder.body.slice(0, 20).trim() + '...'}
          </Typography>
        </Box>
      </Box>

      <Box className="ctas">
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
