import express, { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

const router = express.Router();

// Get all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
});

// Get a specific todo
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
});

// Create a todo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      completed: false
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
});

// Update a todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
});

// Delete a todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

export default router;