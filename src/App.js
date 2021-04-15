//import react
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// material theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

// import viewa and components
import Reminders from './views/Reminders'
import Read from './views/Read'
import Create from './views/Create'
import NotFound from './components/NotFound'

export default function App() {
  // state stuff
  const [titleText, setTitleText] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [reminders, setReminders] = useState([])

  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Nunito', 'san-serif'].join(',')
    }
  })

  // run once
  useEffect(() => {
    // get local todos
    if (localStorage.getItem('reminders') === null) {
      localStorage.setItem('reminders', JSON.stringify([]))
    } else {
      let remindersLocal = JSON.parse(localStorage.getItem('reminders'))
      setReminders(remindersLocal)
    }
  }, [])

  useEffect(() => {
    // add key values to todo list
    reminders.forEach((item, i) => {
      item.id = i + 1
    })
    // save todos to local storage
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [reminders])

  // dynamic reminder path creation
  const renderReminder = (routerProps) => {
    let reminderId = parseInt(routerProps.match.params.id)
    let foundReminder = reminders.find((reminder) => reminder.id === reminderId)

    return foundReminder ? (
      <Read
        setTitleText={setTitleText}
        setBodyText={setBodyText}
        reminder={foundReminder}
        reminders={reminders}
        setReminders={setReminders}
      />
    ) : (
      <NotFound />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className="container">
        <Router>
          <Switch>
            <Route path="/create">
              <Create
                reminders={reminders}
                setReminders={setReminders}
                titleText={titleText}
                setTitleText={setTitleText}
                bodyText={bodyText}
                setBodyText={setBodyText}
              />
            </Route>
            <Route
              path="/reminder/:id"
              render={(reminder) => renderReminder(reminder)}
            />
            <Route path="*">
              <Reminders reminders={reminders} setReminders={setReminders} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  )
}
