<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { formatDate } from 'utils/formatDate';
import dummyData from 'assets/data/dummyData.json';

export enum status {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
=======
import { useState, useEffect } from "react";
import { formatDate } from "utils/formatDate";
import dummyData from "assets/dummyData.json";

export enum status {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
>>>>>>> main
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

<<<<<<< HEAD
export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyData);

=======
export type CreateTodo = {
  task: string;
  importance: number;
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

  // Task 삭제
  const removeTodo = () => {};

  // Task 상태 변경
  const changeStatus = () => {
    const updatedAt = formatDate(new Date());
  };

>>>>>>> main
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todos]);

<<<<<<< HEAD
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
    if (data === null) return;
    setTodos(JSON.parse(data));
    // setTodos(JSON.parse(data!) || [...dummyData]);
  };
  const changeStatus = () => {
    const updatedAt = formatDate(new Date());
  };

  const saveData = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return { todos, createTodo, removeTodo, changeStatus, loadData, saveData };
=======
  const loadData = () => {
    let data = localStorage.getItem("todos");
    setTodos(JSON.parse(data!) || []);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return { todos, createTodo };
>>>>>>> main
};
