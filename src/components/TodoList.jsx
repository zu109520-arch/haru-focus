import { useState } from 'react'

export function TodoList({ todos, setTodos }) {
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="todo-section">
      <h3 className="todo-title">任務清單</h3>
      <div className="todo-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="新增任務..."
        />
        <button onClick={addTodo} className="add-btn">+</button>
      </div>
      <ul className="todo-list">
        {todos.length === 0 && (
          <li className="todo-empty">目前沒有任務</li>
        )}
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <button className="check-btn" onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '✓' : ''}
            </button>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
