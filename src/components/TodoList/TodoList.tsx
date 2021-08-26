import React from "react";
import { Todo } from "todo/TodoService";
import TodoItem from "components/TodoItem/TodoItem";
import styled from "styled-components";

interface TodoListProps {
  changeStatus: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  todo: Todo[];
}

export default function TodoList({
  changeStatus,
  removeTodo,
  todo,
}: TodoListProps) {
  return (
    <Container>
      <Wrap>
        {todo &&
          todo.map((item) => (
            <TodoItem
              changeStatus={changeStatus}
              removeTodo={removeTodo}
              todo={item}
              key={item.id}
            />
          ))}
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  height: 600px;
  padding: 30px;
  background-color: rgb(216, 227, 231);
  overflow-y: scroll;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
