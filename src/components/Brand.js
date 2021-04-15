//import react
import React, { useEffect } from 'react'

// material ui
import { Box, Button, Typography } from '@material-ui/core'

import logoImg from '../assets/logo.png'

export default function Brand() {
  // run once
  useEffect(() => {
    // Code to handle install prompt on desktop
    let deferredPrompt
    const addBtn = document.querySelector('.install')

    addBtn.style.display = 'none'

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block'

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none'
        // Show the prompt
        deferredPrompt.prompt()
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          deferredPrompt = null
        })
      })
    })
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pt={3}
      pb={4}
    >
      <Box display="flex" flexDirection="row">
        <img
          src={logoImg}
          alt="Remind me"
          style={{ width: '30px', height: 'auto', paddingRight: '1rem' }}
        />
        <Typography variant="h5" display="block">
          Remind me
        </Typography>
      </Box>
      <div>
        <Button variant="contained" color="primary" className="install">
          Get app
        </Button>
      </div>
    </Box>
  )
}
