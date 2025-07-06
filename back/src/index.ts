import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todosRoutes from './routes/todos';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string, {
    dbName: "todo-app"
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/todos', todosRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});