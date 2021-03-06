import React, { useState } from "react";
import filter, { FilterTagsType } from "utils/filter";
import { useTodo, status, importance } from "todo/TodoService";
import TodoHeader from "todo/TodoHeader/TodoHeader";
import TodoFilter from "./TodoFilter/TodoFilter";
import useToggle from "hooks/useToggle";
import TodoList from "todo/TodoList/TodoList";
import styled from "styled-components";

const initialFilteredTags: FilterTagsType = {
  status: {
    [status.PENDING]: false,
    [status.ONGOING]: false,
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
  const filterToggle = useToggle();
  const { toggle } = filterToggle;

  const handleFilter = (filter: FilterTagsType): void => {
    setFilterTags((prev: FilterTagsType) => ({
      ...prev,
      ...filter,
    }));
  };

  return (
    <Container>
      <Wrap>
        <TodoHeader createTodo={createTodo} />
        {toggle && (
          <TodoFilter
            filterTags={filterTags}
            handleFilter={handleFilter}
            {...filterToggle}
          />
        )}

        <TodoList
          removeTodo={removeTodo}
          changeStatus={changeStatus}
          todo={filter(filterTags, todos)}
          {...filterToggle}
        />
      </Wrap>
    </Container>
  );
};

export default TodoContainer;

const Container = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  margin-top: 50px;
`;

const Wrap = styled.div`
  width: 500px;
  box-shadow: 1px 5px 8px 2px #0000001f;
`;
