import React, { useState, useEffect } from "react";
import "./App.css";

function Todo({ key, index, todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo">
      <span
        style={{ textDecoration: todo.done ? "line-through" : "" }}
        onClick={e => {
          e.preventDefault();
          toggleTodo(index);
        }}
      >
        {todo.title}
      </span>
      <span
        className="check"
        onClick={() => {
          deleteTodo(index);
        }}
      >
        X
      </span>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <input
          className="todoInput"
          placeholder="Add new todo.."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const addTodo = text => {
    setTodos([...todos, { title: text, done: false }]);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1 className={"heading"}>
        <span role="img" aria-label="Note Book">
          📔
        </span>
        Hooks Todo!
      </h1>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/HarshBhatia/react-hooks-todo"
      >
        <h4 className="credits">GitHub</h4>
      </a>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;
