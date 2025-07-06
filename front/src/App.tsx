import { useState, useEffect } from 'react'
import './App.css'
import { TodoService } from './services/TodoService'
import type { TodoItem, CreateTodoInput } from './types/TodoItem'

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({ title: '', description: '' })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await TodoService.getAllTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch todos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle creating a new todo
  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTodo.title.trim()) {
      setError('Title is required')
      return
    }

    try {
      const createdTodo = await TodoService.createTodo(newTodo)
      setTodos([createdTodo, ...todos])
      setNewTodo({ title: '', description: '' })
      setError(null)
    } catch (err) {
      setError('Failed to create todo')
      console.error(err)
    }
  }

  // Handle toggling todo completion status
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await TodoService.toggleComplete(id, !completed)
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo))
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  // Handle deleting a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id)
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      
      {/* Error message */}
      {error && <div className="error">{error}</div>}
      
      {/* New Todo Form */}
      <form onSubmit={handleCreateTodo} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="todo-input"
          />
          <textarea
            placeholder="Description (optional)"
            value={newTodo.description || ''}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="todo-textarea"
          />
          <button type="submit" className="add-button">Add Todo</button>
        </div>
      </form>
      
      {/* Todo List */}
      <div className="todo-list">
        <h2>Your Todos</h2>
        {loading ? (
          <p>Loading todos...</p>
        ) : todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos?.map((todo) => (
            <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
                <p className="date">Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="todo-actions">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo._id, todo.completed)}
                  className="todo-checkbox"
                />
                <button 
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
