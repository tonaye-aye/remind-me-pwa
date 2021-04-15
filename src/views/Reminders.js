//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// framer motion
import { motion } from 'framer-motion'

// components
import Brand from '../components/Brand'
import Tile from '../components/Tile'

const heroVariants = {
  hidden: {
    opacity: 0,
    y: '100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.2, delay: 0.5 }
  }
}

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
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <Box mb={2}>
              <Typography variant="h6" display="block">
                You have no reminders!
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/create')}
              size="small"
              startIcon={<AddIcon />}
            >
              New reminder
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  )
}
