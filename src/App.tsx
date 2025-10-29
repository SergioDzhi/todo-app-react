import { useState, useEffect } from 'react';
import { TodoList } from './Components/TodoList';
import { AddTodo } from './Components/AddTodo';
import type { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <div className="stats">
        Активных задач: {activeCount} из {todos.length}
      </div>
    </div>
  );
}

export default App;
