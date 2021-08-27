import React, { useState } from "react";
import styled, { css } from "styled-components";
import EditIcon from "components/icons/EditIcon";
import TrashIcon from "components/icons/TrashIcon";
import { Todo, status, importance } from "todo/TodoService";

interface TodoItemProps {
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  changeStatus: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  todo: Todo;
}

export default function TodoItem({
  onDragStart,
  onDragOver,
  changeStatus,
  removeTodo,
  todo,
}: TodoItemProps) {
  const [isModify, setIsModify] = useState(false);
  const [form, setForm] = useState<Todo>(todo);

  const hadleEdit = (id: number): void => {
    setIsModify(true);
    setForm(todo);
  };
  const handleRemove = (id: number): void => removeTodo(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev: Todo) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatus = (status: any) => {
    setForm((prev: Todo) => ({
      ...prev,
      status,
    }));
  };

  const handleSubmit = (): void => {
    changeStatus(form);
    setIsModify(false);
  };

  return (
    <Container
      draggable
      data-position={todo.index}
      isModify={isModify}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <TaskBox>
        <ImfortanceBox>
          {!isModify ? (
            <ImfortanceStatus>{todo.importance}</ImfortanceStatus>
          ) : (
            <Select
              name="importance"
              value={form.importance}
              onChange={handleChange}
            >
              {Object.values(importance).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          )}
        </ImfortanceBox>
        {!isModify ? (
          <Text>{todo.task}</Text>
        ) : (
          <TaskInput name="task" value={form.task} onChange={handleChange} />
        )}
      </TaskBox>
      <Wrap>
        <StatusBox>
          {isModify ? (
            Object.values(status).map((status) => (
              <Status
                key={status}
                isModify={isModify}
                isStatus={status}
                currentStatus={form.status}
                onClick={() => handleStatus(status)}
              >
                {status}
              </Status>
            ))
          ) : (
            <Status isModify={isModify} isStatus={todo.status}>
              {todo.status}
            </Status>
          )}
        </StatusBox>
        {!isModify ? (
          <div>
            <ModifyButton onClick={() => hadleEdit(todo.id)}>
              {/* <Edit /> */}
              <EditIcon />
            </ModifyButton>
            <DeleteButton onClick={() => handleRemove(todo.id)}>
              {/* <Trash /> */}
              <TrashIcon />
            </DeleteButton>
          </div>
        ) : (
          <ButtonBox>
            <ConformButton onClick={handleSubmit}>확인</ConformButton>
            <CancleButton onClick={() => setIsModify(false)}>취소</CancleButton>
          </ButtonBox>
        )}
      </Wrap>
    </Container>
  );
}

const Container = styled.div<{ isModify: boolean }>`
  ${({ theme }) => theme.flexSet("space-between", "", "column")};
  width: 100%;
  height: 55px;
  min-height: ${({ isModify }) => (isModify ? "110px" : "70px")};
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  cursor: default;
  transition: 0.3s;
`;

const ImfortanceStatus = styled.div`
  margin: 2px 6px 0 0;
`;

const TaskBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
  height: 100%;
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
`;

const TaskInput = styled.input`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  padding-left: 5px;
  box-shadow: 0 1px 2px 1px #0000001f;
  height: 30px;
  border-radius: 5px;
`;

const ImfortanceBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;
const Select = styled.select`
  width: 50px;
  height: 30px;
  padding: 6px;
  margin-right: 8px;
  border: 0px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 1px #0000001f;
`;

const Wrap = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
  margin-top: 10px;
`;

const StatusBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;

const Status = styled.div<{
  isModify: boolean;
  isStatus: string;
  currentStatus?: string;
}>`
  ${({ theme }) => theme.flexSet()};
  max-width: 80px;
  padding: 2px 4px 4px;
  margin-right: 6px;
  border-radius: 3px;
  color: rgb(18 110 130);
  border: 1px solid rgb(18 110 130);
  transition: 0.2s;
  opacity: 0.7;

  &:hover {
    ${({ isModify }) => {
      if (isModify) {
        return css`
          color: white;
          border: 1px solid rgb(18 110 130);
          background-color: rgb(18 110 130);
          cursor: pointer;
        `;
      }
    }}
  }

  ${({ isModify, isStatus, currentStatus }) => {
    if (isModify) {
      if (isStatus === currentStatus) {
        return css`
          color: white;
          border: 1px solid rgb(18 110 130);
          background-color: rgb(18 110 130);
        `;
      }
    }
  }}
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
  ${({ theme }) => theme.flexSet("flex-end", "flex-end")};
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
  background-color: rgb(18 110 130);
  opacity: 0.5;
`;

const CancleButton = styled(ConformButton)`
  margin-left: 6px;
  background-color: rgb(216, 227, 231);
  color: rgb(55 55 55);
`;
