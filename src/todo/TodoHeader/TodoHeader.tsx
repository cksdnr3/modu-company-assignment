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

    createTodo({
      task: form.task,
      importance: Number(form.importance),
    });

    setForm({ task: '', importance: importance.LOW });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const changeToIcon = (value: number) => {
    if (value === 0) return ` 🔴 ${importance[value]}`;
    if (value === 1) return ` 🟡 ${importance[value]}`;
    if (value === 2) return ` 🟢 ${importance[value]}`;
  };

  return (
    <Contianer onSubmit={onSubmit}>
      <Select name='importance' onChange={onChange}>
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
    </Contianer>
  );
};

const Contianer = styled.form`
  ${({ theme }) => theme.flexSet()};
  width: 100%;
  padding: 20px;
  background-color: #f5f5f7;
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
  height: 100%;
  margin: 0px;
  padding: 0px;
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
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
