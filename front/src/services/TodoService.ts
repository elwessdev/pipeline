import axios from 'axios';
import type { TodoItem } from '../types/TodoItem';
import type { CreateTodoInput } from '../types/TodoItem';

const API_URL = `${import.meta.env.VITE_API_URL}/api/todos`;

export const TodoService = {
  getAllTodos: async (): Promise<TodoItem[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTodoById: async (id: string): Promise<TodoItem> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTodo: async (todo: CreateTodoInput): Promise<TodoItem> => {
    const response = await axios.post(API_URL, todo);
    return response.data;
  },

  updateTodo: async (id: string, todo: Partial<TodoItem>): Promise<TodoItem> => {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  toggleComplete: async (id: string, completed: boolean): Promise<TodoItem> => {
    const response = await axios.put(`${API_URL}/${id}`, { completed });
    return response.data;
  }
};