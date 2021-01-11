//import react
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import components
import Home from './components/Home'
import Form from './components/Form'

export default function App() {
  // state stuff
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])

  // run once
  useEffect(() => {
    // get local todos
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }

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

  useEffect(() => {
    // save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <Router>
        <Switch>
          <Route path="/new">
            <Form
              todos={todos}
              setTodos={setTodos}
              inputText={inputText}
              setInputText={setInputText}
            />
          </Route>
          <Route path="/">
            <Home todos={todos} setTodos={setTodos} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
