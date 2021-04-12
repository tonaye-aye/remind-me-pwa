//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// components
import Brand from '../components/Brand'
import Tile from '../components/Tile'

export default function Reminders({ reminders, setReminders }) {
  const history = useHistory()

  return (
    <Box>
      <Brand />
      <Button
        variant="contained"
        color="primary"
        className="new-reminder"
        type="submit"
      >
        <AddIcon onClick={() => history.push('/create')} />
      </Button>
      {reminders.map((reminder, index) => (
        <Tile
          key={index}
          reminders={reminders}
          setReminders={setReminders}
          reminder={reminder}
        />
      ))}
    </Box>
  )
}
