import React, { useState } from "react";
import TodoList from "components/TodoList/TodoList";
import TodoHeader from "todo/TodoHeader/TodoHeader";
import filter from "utils/filter";
import { useTodo, status, importance } from "todo/TodoService";
import styled from "styled-components";

type InitialFilteredTagsType = {
  status: StatusType;
  importance: ImportanceType;
};

type StatusType = {
  [key: string]: boolean;
};

type ImportanceType = {
  [key: number]: boolean;
};

const initialFilteredTags: InitialFilteredTagsType = {
  status: {
    [status.PENDING]: false,
    [status.ONGOING]: true,
    [status.COMPLETED]: false,
  },
  importance: {
    [importance.LOW]: false,
    [importance.MID]: false,
    [importance.HIGH]: false,
  },
};

const TodoContainer: React.FC = () => {
  const { todos, createTodo, removeTodo, changeStatus } = useTodo();

  const [filterTags, setFilterTags] = useState(initialFilteredTags);

  const handleStatusFilter = (tag: string) => {
    setFilterTags((prev) => ({
      ...prev,
      status: { ...prev.status, [tag]: !prev.status[tag] },
    }));
  };

  const handleImportanceFilter = (tag: number) => {
    setFilterTags((prev) => ({
      ...prev,
      importance: { ...prev.importance, [tag]: !prev.importance[tag] },
    }));
  };

  return (
    <Container>
      <TodoHeader createTodo={createTodo} />
      <TodoList
        removeTodo={removeTodo}
        changeStatus={changeStatus}
        todo={todos}
      />
    </Container>
  );
};

export default TodoContainer;

const Container = styled.div`
  ${({ theme }) => theme.flexSet()};
  /* color: rgb(18, 110, 130); */
`;
