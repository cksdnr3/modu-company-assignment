import React, { useState } from 'react';
import { CreateTodo, importance } from 'todo/TodoService';
import styled from 'styled-components/macro';

const impotantRank = [importance.LOW, importance.MID, importance.HIGH];

interface TodoHeaderProps {
  createTodo: (todo: CreateTodo) => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ createTodo }) => {
  const [form, setForm] = useState<CreateTodo>({
    task: '',
    importance: importance.LOW,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!form.task.trim()) return;
    createTodo(form);
    setForm({ task: '', importance: importance.LOW });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const changeToIcon = (value: string) => {
    if (value === 'LOW') return `🔴 ${importance[value]}`;
    if (value === 'MID') return `🟡 ${importance[value]}`;
    if (value === 'HIGH') return `🟢 ${importance[value]}`;
  };

  return (
    <Contianer>
      <TextBox>
        <Icon>📅</Icon>
        <Text>Todo List</Text>
      </TextBox>
      <CreactBox onSubmit={onSubmit}>
        <Select name='importance' value={form.importance} onChange={onChange}>
          <option value='none'>중요도</option>
          {impotantRank.map((value) => (
            <option key={value} value={value}>
              {changeToIcon(value)}
            </option>
          ))}
        </Select>
        <Input
          name='task'
          type='text'
          autoFocus
          onChange={onChange}
          value={form.task}
          placeholder='할 일을 입력 후, Enter 를 누르세요'
        />
        <Button>ADD</Button>
      </CreactBox>
    </Contianer>
  );
};

const Contianer = styled.div`
  ${({ theme }) => theme.flexSet('', '', 'column')};
  padding: 20px;
  background-color: #f5f5f7;
`;

const TextBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start')};
  margin-bottom: 20px;
`;

const Icon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const CreactBox = styled.form`
  ${({ theme }) => theme.flexSet()};
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 2;
  height: 39px;
  margin: 0px;
  padding: 0px;
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  border-left: 1px solid rgb(226 226 226);
`;

const Button = styled.button`
  ${({ theme }) => theme.flexSet()};
  height: 38px;
  width: 70px;
  border-radius: 5px;
  padding: 10px;
  color: white;
  background-color: rgb(18 110 130);
  opacity: 0.5;
  cursor: pointer;
`;

export default TodoHeader;
