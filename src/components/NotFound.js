//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Box, Button, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

export default function NotFound() {
  const history = useHistory()

  return (
    <Box className="center-div" textAlign="center">
      <Box mb={2}>
        <Typography variant="h6" display="block">
          Whoops! No reminder found.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/')}
        size="small"
        startIcon={<HomeIcon />}
      >
        Go Home
      </Button>
    </Box>
  )
}
