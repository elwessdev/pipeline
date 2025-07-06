export interface TodoItem {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}