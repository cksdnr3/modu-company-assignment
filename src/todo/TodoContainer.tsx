import React, { useState } from "react";
import { useTodo } from "./TodoService";
import TodoHeader from "todo/header/TodoHeader";

const TodoContainer: React.FC = () => {
  const { todos, createTodo } = useTodo();

  return (
    <>
      <TodoHeader createTodo={createTodo} />
    </>
  );
};

export default TodoContainer;
