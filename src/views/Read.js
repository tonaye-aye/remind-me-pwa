//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

// framer motion
import { motion } from 'framer-motion'

const navVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.2, delay: 0.4 }
  }
}
const formVariants = {
  hidden: {
    opacity: 0,
    y: '100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.2, delay: 0.8 }
  }
}

export default function Read({
  setTitleText,
  setBodyText,
  reminder,
  reminders,
  setReminders
}) {
  const history = useHistory()

  // go to edit note page, taking this reminder detail with you
  const editHandler = () => {
    setTitleText(reminder.title)
    setBodyText(reminder.body)
    history.push('/create')
    setReminders(reminders.filter((item) => item.id !== reminder.id))
  }

  return (
    <Box>
      <motion.div variants={navVariants} initial="hidden" animate="visible">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={3}
          pb={4}
        >
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
      </motion.div>
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <Typography variant="overline">Title</Typography>
        <Box className="reminder">
          <Typography variant="body1">{reminder.title}</Typography>
        </Box>
        <Typography variant="overline">Details</Typography>
        <Box className="reminder">
          <Typography variant="body1">{reminder.body}</Typography>
        </Box>
      </motion.div>
    </Box>
  )
}
