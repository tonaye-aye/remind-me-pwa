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
