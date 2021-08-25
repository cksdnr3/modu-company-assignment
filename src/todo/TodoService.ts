import { useState, useEffect } from "react";
import { formatDate } from "utils/formatDate";
import dummyData from "assets/dummyData.json";

export const status = {
  PENDING: "pending",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

export enum importance {
  LOW,
  MID,
  HIGH,
}

export type Todo = {
  id: number;
  task: string;
  status: string;
  importance: number;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodo = {
  task: string;
  importance: number;
};

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyData);

  // Task 추가
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
    setTodos(JSON.parse(data!) || []);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return { todos, createTodo };
};
