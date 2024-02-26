import { useState } from 'react'

import './App.css'

function App() {
  const [newTodo, setNewTodo] = useState("")
  const [list, setList] = useState([]);
  const [filterActive, setFilterActive] = useState("all");


  const handleChange = (e) => {
    setNewTodo(e.target.value);
  }

  const addList = (text) => {
    if (text.trim() !== "") {
      setList([...list, { text, done: false }])
      setNewTodo("")
    }
  }

  const togglelist = (toDoToggle) => {
    setList(list.map((todo) =>
      todo === toDoToggle ? { ...todo, done: !todo.done } : todo
    ))

  }

  const deleteTodo = (deleteToDo) => {
    setList(list.filter((todo) =>
      todo !== deleteToDo
    ))
  }

  const clearAll = () => {
    setList(list.filter((todo) =>
      todo.done == false
    ))
  }
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addList(newTodo.trim())
            }}
          >
            <input className="new-todo" placeholder="What needs to be done?" autoFocus
              type='text'
              value={newTodo}
              onChange={handleChange}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all"

          >
            Mark all as complete
          </label>

          <ul className="todo-list">
            {list.map((todo, index) => (
              <li className={todo.done ? "completed" : ""}
                key={index}
                hidden={
                  (todo.done && filterActive === "active") ||
                  (!todo.done && filterActive === "completed")
                }
              >

                <div className="view">
                  <input className="toggle" type="checkbox"
                    onChange={() => togglelist(todo)}
                  />
                  <label>{todo.text}</label>
                  <button className="destroy"
                    onClick={() => deleteTodo(todo)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>
              {list.filter((todo) => !todo.done).length} {" "}
              {list.filter((todo) => !todo.done).length === 1 ? 'item' : 'items'} left
            </strong>
          </span>

          <ul className="filters">

            <li>
              <a href="#/"
                onClick={() => setFilterActive("all")}
                className={filterActive === "all" ? "selected" : ""}

              >All</a>
            </li>
            <li>
              <a href="#/"
                onClick={() => setFilterActive("active")}
                className={filterActive === "active" ? "selected" : ""}
              >Active</a>
            </li>
            <li>
              <a href="#/"
                onClick={() => setFilterActive("completed")}
                className={filterActive === "completed" ? "selected" : ""}

              >Completed</a>
            </li>
          </ul>

          <button className="clear-completed"
            hidden={list.filter((todo) => todo.done).length === 0}
            onClick={clearAll}
          >
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  )
}

export default App
