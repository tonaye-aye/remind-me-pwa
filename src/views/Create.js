//import react
import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

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

// customised input fields here, created a custom element
const CustomInput = withStyles((theme) => ({
  root: {
    padding: 0
  },
  input: {
    borderRadius: '4px',
    position: 'relative',
    backgroundColor: '#e9e9e9',
    border: 'none',
    boxShadow:
      '0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.075), 0 8px 8px rgba(0, 0, 0, 0.05), 0 16px 16px rgba(0, 0, 0, 0.025)',
    padding: '.8rem 1.2rem',
    '&::placeholder': {
      fontSize: '0.75rem',
      fontFamily: ['"Nunito"'].join(','),
      fontWeight: 400,
      textTransform: 'uppercase',
      opacity: '0.3'
    }
  }
}))(InputBase)

export default function Create({
  reminders,
  setReminders,
  titleText,
  setTitleText,
  bodyText,
  setBodyText
}) {
  // history
  const history = useHistory()

  // state stuff - store variable in case of cancel
  const [error, seterror] = useState({
    title: false,
    details: false,
    message: 'Please fill out all fields.'
  })

  // handle input texts
  const titleHandler = (e) => {
    setTitleText(e.target.value)
    seterror({ ...error, title: false })
  }
  const bodyHandler = (e) => {
    setBodyText(e.target.value)
    seterror({ ...error, details: false })
  }

  // get initial state of reminder/note, and save in case of cancel edit
  const refTitle = useRef(titleText)
  const refBody = useRef(bodyText)

  const cancelHandler = () => {
    if (refTitle.current.length > 0 || refBody.current.length > 0) {
      setReminders([
        ...reminders,
        {
          title: refTitle.current,
          body: refBody.current
        }
      ])
    }
    setTitleText('')
    setBodyText('')
    history.push('/')
  }

  // submit new todo list item
  const submitHandler = (e) => {
    e.preventDefault()
    if (bodyText === '') {
      seterror({ ...error, details: true })
    } else if (titleText === '') {
      seterror({ ...error, title: true })
    } else {
      setReminders([...reminders, { title: titleText, body: bodyText }])
      setTitleText('')
      setBodyText('')
      history.push('/')
    }
  }
  // on keyboard press 'enter'
  const checkKey = (e) => {
    if (e.key === 'Enter') {
      submitHandler(e)
    }
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
            color="secondary"
            onClick={cancelHandler}
            size="small"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="install"
            size="small"
            startIcon={<SaveIcon />}
            onClick={submitHandler}
          >
            Save
          </Button>
        </Box>
      </motion.div>
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <form noValidate autoComplete="off">
          <Typography variant="overline">Title</Typography>
          <Box className="edit">
            <CustomInput
              autoFocus
              placeholder="Title"
              variant="filled"
              fullWidth={true}
              value={titleText}
              onChange={titleHandler}
              onKeyPress={checkKey}
              style={{ marginBottom: '0.3rem' }}
            />
          </Box>
          <Typography variant="overline">Details</Typography>
          <Box className="edit">
            <CustomInput
              placeholder="Details"
              variant="filled"
              multiline
              fullWidth={true}
              value={bodyText}
              onChange={bodyHandler}
              onKeyPress={checkKey}
            />
          </Box>
          <Typography variant="caption" color="secondary">
            {(error.title || error.details) && error.message}
          </Typography>
        </form>
      </motion.div>
    </Box>
  )
}
