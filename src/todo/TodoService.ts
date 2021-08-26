import { useState, useEffect } from "react";
import { formatDate } from "utils/formatDate";
import dummyData from "assets/dummyData.json";

export enum status {
  PENDING = "pending",
  ONGOING = "ongoing",
  COMPLETED = "completed",
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

  // Task 삭제
  const removeTodo = () => {};

  // Task 상태 변경
  const changeStatus = () => {
    const updatedAt = formatDate(new Date());
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todos]);

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === null) return;
    setTodos(JSON.parse(data));
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return { todos, createTodo };
};
