//import react
import React from 'react'
import { useHistory } from 'react-router-dom'

// material ui
import { Button, Container } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// components
import Header from './Header'
import Reminder from './Reminder'

export default function Home({ todos, setTodos }) {
  const history = useHistory()

  return (
    <Container className="container">
      <Header />
      <Button
        variant="contained"
        color="primary"
        className="new-note"
        type="submit"
      >
        <AddIcon onClick={() => history.push('/new')} />
      </Button>
      {todos.map((todo) => (
        <Reminder
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
          todo={todo}
          text={todo.text}
        />
      ))}
    </Container>
  )
}
