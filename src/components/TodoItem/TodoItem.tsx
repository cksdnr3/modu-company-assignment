import React, { useState } from 'react';
import { Todo } from 'todo/TodoService';
import { status } from 'todo/TodoService';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Trash } from 'assets/images/trash.svg';
import styled from 'styled-components';

const statusRank = [status.PENDING, status.ONGOING, status.COMPLETED];

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
  const [isModify, setIsModify] = useState(false);

  const hadleEdit = (id: number) => {
    setIsModify(true);
    changeStatus(id);
  };

  const handleRemove = (id: number) => {
    removeTodo(id);
  };

  return (
    <Container isModify={isModify}>
      <TaskBox>
        <TaskTitleBox>
          <ImfortanceStatus>{todo.importance}</ImfortanceStatus>
          {!isModify ? <Text>{todo.task}</Text> : <TaskInput />}
        </TaskTitleBox>
        <StatusBox>
          <Status isModify={isModify} isStatus={todo.status}>
            {todo.status}
          </Status>
          {isModify &&
            statusRank
              .filter((status) => status !== todo.status)
              .map((status) => (
                <Status isModify={isModify} isStatus={status}>
                  {status}
                </Status>
              ))}
        </StatusBox>
      </TaskBox>
      {!isModify ? (
        <div>
          <ModifyButton onClick={() => hadleEdit(todo.id)}>
            <Edit />
          </ModifyButton>
          <DeleteButton onClick={() => handleRemove(todo.id)}>
            <Trash />
          </DeleteButton>
        </div>
      ) : (
        <ButtonBox>
          <ConformButton>확인</ConformButton>
          <CancleButton onClick={() => setIsModify(false)}>취소</CancleButton>
        </ButtonBox>
      )}
    </Container>
  );
}

const Container = styled.div<{ isModify: boolean }>`
  ${({ theme }) => theme.flexSet('space-between')};
  width: 100%;
  height: 55px;
  min-height: ${({ isModify }) => (isModify ? '90px' : '70px')};
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  transition: 0.3s;
`;

const TaskTitleBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start')};
`;

const ImfortanceStatus = styled.div`
  margin: 2px 6px 0 0;
`;

const TaskBox = styled.div`
  ${({ theme }) => theme.flexSet('space-between', '', 'column')};
  height: 100%;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const TaskInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  padding-left: 5px;
`;

const StatusBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start')};
`;

const Status = styled.div<{ isModify: boolean; isStatus: string }>`
  ${({ theme }) => theme.flexSet()};
  max-width: 80px;
  margin: 6px 6px 0 0;
  padding: 2px 4px 4px;
  color: rgb(230 32 32);
  border: 1px solid rgb(230 32 32);
  border-radius: 3px;
  /* rgb(29 162 58); 초록 */
  /* color: rgb(42 67 191);
    border: 1px solid rgb(38 68 220); */
  ${({ isModify, isStatus }) =>
    isModify &&
    isStatus === 'pending' &&
    `&:hover {
    color: white;
    border: 1px solide rgb(230 32 32);
    background-color: rgb(230 32 32);
    cursor: pointer;
  `} }
  
`;

const ModifyButton = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: rgb(183 183 183);
  cursor: pointer;

  &:hover {
    fill: rgb(40 40 40);
  }
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  fill: rgb(183 183 183);

  cursor: pointer;

  &:hover {
    fill: rgb(230 32 32);
  }
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-end', 'flex-end')};
  height: 100%;
  cursor: pointer;
`;

const ConformButton = styled.button`
  ${({ theme }) => theme.flexSet()};
  height: 38px;
  width: 70px;
  border-radius: 5px;
  padding: 10px;
  color: white;
  background-color: hsl(
    190.7142857142857,
    75.67567567567568%,
    29.01960784313725%
  );
  opacity: 0.5;
`;

const CancleButton = styled(ConformButton)`
  margin-left: 6px;
  background-color: rgb(216, 227, 231);
  color: gray;
`;
