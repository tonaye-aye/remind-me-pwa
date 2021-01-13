//import react
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import components
import Home from './components/views/Home'
import Form from './components/views/Form'
import Reminder from './components/views/Reminder'
import NotFound from './components/errors/NotFound'

export default function App() {
  // state stuff
  const [inputText, setInputText] = useState('')
  const [reminders, setReminders] = useState([])

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

  const renderReminder = (routerProps) => {
    let reminderId = parseInt(routerProps.match.params.id)
    let foundReminder = reminders.find((reminder) => reminder.id === reminderId)

    return foundReminder ? (
      <Reminder
        reminder={foundReminder}
        reminders={reminders}
        setReminders={setReminders}
      />
    ) : (
      <NotFound />
    )
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/new">
            <Form
              reminders={reminders}
              setReminders={setReminders}
              inputText={inputText}
              setInputText={setInputText}
            />
          </Route>
          <Route
            path="/reminder/:id"
            render={(routerProps) => renderReminder(routerProps)}
          />
          <Route path="/">
            <Home reminders={reminders} setReminders={setReminders} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
