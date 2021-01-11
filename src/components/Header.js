//import react
import React, { useEffect } from 'react'

// material ui
import { Box, Button, Typography } from '@material-ui/core'

export default function Header() {
  // run once
  useEffect(() => {}, [])

  return (
    <Box className="nav">
      <Typography variant="overline" display="block">
        Remind m3
      </Typography>
      <Button variant="contained" className="install">
        Get app
      </Button>
    </Box>
  )
}
