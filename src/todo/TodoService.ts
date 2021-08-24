import { useState, useEffect } from 'react';
import { formatDate } from 'utils/formatDate';
import dummyData from 'assets/data/dummyData.json';

export enum status {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

export enum importance {
  LOW,
  MID,
  HIGH,
}

export type Todo = {
  [key: string]: string | number | undefined;
  id: number;
  task: string;
  status: string;
  importance: number;
  createdAt: string;
  updatedAt?: string;
};

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyData);

<<<<<<< HEAD
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todos]);

=======
>>>>>>> f3aa509 (add: icon files)
  // Task 추가
  const createTodo = () => {
    const createdAt = formatDate(new Date());
  };

  // Task 삭제
  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const loadData = () => {
    let data = localStorage.getItem('todos');
<<<<<<< HEAD
    if (data === null) return;
    setTodos(JSON.parse(data));
    // setTodos(JSON.parse(data!) || [...dummyData]);
  };
  const changeStatus = () => {
    const updatedAt = formatDate(new Date());
=======
    console.log(data);
    if (data) {
      setTodos(JSON.parse(data));
    } else {
      setTodos(JSON.parse(data!) || [...dummyData]);
    }
>>>>>>> f3aa509 (add: icon files)
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return { todos, createTodo, removeTodo, changeStatus, loadData, saveData };
};
