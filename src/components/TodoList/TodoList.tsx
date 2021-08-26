import React from "react";
import { Todo } from "todo/TodoService";
import TodoItem from "components/TodoItem/TodoItem";
import styled from "styled-components";
import FilterIcon from "components/FilterIcon";

interface TodoListProps {
  changeStatus: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggle: boolean;
  handleToggle: () => void;
  todo: Todo[];
}

export default function TodoList({
  changeStatus,
  removeTodo,
  handleToggle,
  todo,
}: TodoListProps) {
  return (
    <Container>
      <Reverse>
        <FilterIcon 
        width="27"
        height="27"
        handleToggle={handleToggle} />
      </Reverse>
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
  width: 100%;
  height: 600px;
  padding: 30px;
  background-color: rgb(216, 227, 231);
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Reverse = styled.span`
  display: flex;
  flex-direction: row-reverse;
`