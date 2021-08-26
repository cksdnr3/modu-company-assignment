import { useState, useEffect } from 'react';
import { formatDate } from 'utils/formatDate';
import dummyData from 'assets/data/dummyData.json';

export enum status {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

export enum importance {
  LOW = 'low',
  MID = 'mid',
  HIGH = 'high',

}

export type Todo = {
  [key: string]: string | number | undefined;
  id: number;
  task: string;
  status: string;
  importance: string;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodo = {
  task: string;
  importance: string;
};

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyData);

  const createTodo = (todo: CreateTodo) => {
    const id = Math.max(0, ...todos.map((todo) => todo.id)) + 1;
    const createdAt = formatDate(new Date());

    setTodos([
      ...todos,
      {
        id,
        status: status.PENDING,
        ...todo,
        createdAt,
      },
    ]);
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const changeStatus = (todo: Todo) => {
    const updatedAt = formatDate(new Date());
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === todo.id ? { ...todo, updatedAt } : prevTodo
      )
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todos]);

  const loadData = () => {
    let data = localStorage.getItem('todos');
    setTodos(JSON.parse(data!) || [...dummyData]);
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return {
    todos,
    createTodo,
    removeTodo,
    changeStatus,
    loadData,
    saveData,
  };
};
