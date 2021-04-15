//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

// components
import Brand from '../components/Brand'
import Tile from '../components/Tile'

export default function Reminders({ reminders, setReminders }) {
  const history = useHistory()

  return (
    <Box flexGrow={1}>
      <Brand />
      {Object.keys(reminders).length > 0 && (
        <Button
          variant="contained"
          color="primary"
          className="new-reminder"
          type="submit"
        >
          <AddIcon onClick={() => history.push('/create')} />
        </Button>
      )}
      {Object.keys(reminders).length > 0 ? (
        reminders.map((reminder, index) => (
          <Tile
            key={index}
            reminders={reminders}
            setReminders={setReminders}
            reminder={reminder}
          />
        ))
      ) : (
        <Box className="center-div" textAlign="center">
          <Box mb={2}>
            <Typography variant="h6" display="block">
              You have no reminders!
            </Typography>
            <Typography variant="overline" display="block">
              Use the button below to get started.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            className="new-reminder-start"
            type="submit"
          >
            <AddIcon onClick={() => history.push('/create')} />
          </Button>
        </Box>
      )}
    </Box>
  )
}
