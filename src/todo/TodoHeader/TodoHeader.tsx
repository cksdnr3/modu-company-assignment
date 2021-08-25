import React, { useState } from "react";
import styled from "styled-components";
import { CreateTodo, importance } from "todo/TodoService";

const impotantRank = [importance.LOW, importance.MID, importance.HIGH];

interface TodoHeaderProps {
  createTodo: (todo: CreateTodo) => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ createTodo }) => {
  const [form, setForm] = useState<CreateTodo>({
    task: "",
    importance: importance.LOW,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!form.task.trim()) return;

    createTodo({
      task: form.task,
      importance: Number(form.importance),
    });

    setForm({ task: "", importance: importance.LOW });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Contianer>
      <InsertForm onSubmit={onSubmit}>
        <SelectDiv>
          중요도 - {importance[form.importance]}
          <Select name="importance" value={form.importance} onChange={onChange}>
            {impotantRank.map((value) => (
              <option key={value} value={value}>
                {importance[value]}
              </option>
            ))}
          </Select>
        </SelectDiv>
        <Input
          name="task"
          type="text"
          autoFocus
          onChange={onChange}
          value={form.task}
          placeholder="할 일을 입력 후, Enter 를 누르세요"
        />
        <Button>ADD</Button>
      </InsertForm>
    </Contianer>
  );
};

const Contianer = styled.div`
  position: fixed;
  width: 100%;
`;

const InsertForm = styled.form`
  display: flex;
  padding: 30px;
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  max-width: 500px;
  border: 1px solid gray;
`;

const Button = styled.button`
  padding: 12px;
  border: 1px solid gray;
  cursor: pointer;
`;

const SelectDiv = styled.div`
  position: relative;
  padding: 12px;
  border: 1px solid gray;

  ::before {
    content: "";
    position: absolute;
    top: 45%;
    right: 10px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  }
`;

const Select = styled.select`
  cursor: pointer;
  opacity: 0;
`;

export default TodoHeader;
