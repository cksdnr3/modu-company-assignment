import React, { useState, useEffect } from "react";
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

interface Drag {
  point: number;
  originalOrder: Todo[];
}

export default function TodoList({
  changeStatus,
  removeTodo,
  handleToggle,
  todo,
}: TodoListProps) {
  const [list, setList] = useState<Todo[]>([]);
  const [drag, setDrag] = useState<Drag>({
    point: -1,
    originalOrder: [],
  });

  useEffect(() => setList(todo), [todo]);

  const onDragStart = (event: React.DragEvent<HTMLElement>): void => {
    const startPosition = Number(event.currentTarget.dataset.position);
    setDrag({ point: startPosition, originalOrder: list });
  };

  const onDragOver = (event: React.DragEvent<HTMLElement>): void => {
    event.preventDefault();

    const overPosition = Number(event.currentTarget.dataset.position);
    const dragList = drag.originalOrder.filter((_, idx) => idx !== drag.point);

    setList([
      ...dragList.slice(0, overPosition),
      drag.originalOrder[drag.point],
      ...dragList.slice(overPosition),
    ]);
  };

  return (
    <Container>
      <Icon onClick={handleToggle}>
        <FilterIcon />
      </Icon>
      <Wrap>
        {list &&
          list.map((item) => (
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

const Icon = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;
