//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Button, Container } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// components
import Header from './Header'
import Tile from './Tile'

export default function Notes({ reminders, setReminders }) {
  const history = useHistory()

  return (
    <Container className="container">
      <Header />
      <Button
        variant="contained"
        color="primary"
        className="new-note-btn"
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
    </Container>
  )
}
