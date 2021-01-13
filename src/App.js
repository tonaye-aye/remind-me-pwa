//import react
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import components
import Home from './components/Home'
import Form from './components/Form'
import Note from './components/Note'
import NotFound from './components/errors/NotFound'

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
    // add key values to todo list
    todos.forEach((item, i) => {
      item.id = i + 1
    })
    // save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const renderNote = (routerProps) => {
    let noteId = parseInt(routerProps.match.params.id)
    let foundNote = todos.find((item) => item.id === noteId)

    return foundNote ? (
      <Note note={foundNote} todos={todos} setTodos={setTodos} />
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
              todos={todos}
              setTodos={setTodos}
              inputText={inputText}
              setInputText={setInputText}
            />
          </Route>
          <Route
            path="/note/:id"
            render={(routerProps) => renderNote(routerProps)}
          />
          <Route path="/">
            <Home todos={todos} setTodos={setTodos} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
