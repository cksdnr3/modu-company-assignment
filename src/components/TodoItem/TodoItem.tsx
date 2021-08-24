import React from 'react';
import { Todo } from 'todo/TodoService';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Trash } from 'assets/images/trash.svg';
import styled from 'styled-components';

interface TodoItemProps {
  changeStatus: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Todo;
}

export default function TodoItem({
  changeStatus,
  removeTodo,
  todo,
}: TodoItemProps) {
  const hadleEdit = (id: number) => {
    changeStatus(id);
  };

  const handleRemove = (id: number) => {
    removeTodo(id);
  };

  return (
    <Container>
      <div>
        <Text>{todo.task}</Text>
        <Status>{todo.status}</Status>
      </div>
      <div>
        <ModifyButton onClick={() => hadleEdit(todo.id)}>
          <Edit />
        </ModifyButton>
        <DeleteButton onClick={() => handleRemove(todo.id)}>
          <Trash />
        </DeleteButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet('space-between')};
  width: 100%;
  min-height: 50px;
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Status = styled.div`
  ${({ theme }) => theme.flexSet()};
  margin-top: 6px;
  padding: 2px 4px 4px;
  color: rgb(230 32 32);
  border: 1px solid rgb(230 32 32);
  border-radius: 3px;
`;

const ModifyButton = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
`;
