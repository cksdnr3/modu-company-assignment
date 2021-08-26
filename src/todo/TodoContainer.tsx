import React, { useState } from "react";
import filter, { FilterTagsType } from "utils/filter";
import { useTodo, status, importance } from "todo/TodoService";
import TodoHeader from "todo/TodoHeader/TodoHeader";
import FilterIcon from "components/FilterIcon";
import TodoFilter from "./TodoFilter/TodoFilter";
import useToggle from "hooks/useToggle";

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
  const { todos, createTodo } = useTodo();
  const [filterTags, setFilterTags] = useState(initialFilteredTags);
  const filterToggle = useToggle();
  const { toggle, handleToggle } = filterToggle;

  const handleFilter = (filter: FilterTagsType): void => {
    setFilterTags((prev: FilterTagsType) => ({
      ...prev,
      ...filter
    }));
  };

  return (
    <>
      <TodoHeader createTodo={createTodo} />
      {
        toggle 
        && <TodoFilter 
          filterTags={filterTags}
          handleFilter={handleFilter}
          {...filterToggle} 
          />
      }

    </>
  );
};

export default TodoContainer;
