import React from 'react';
import { useTodo } from './TodoService';

const TodoContainer: React.FC = () => {
    const { todos } = useTodo();

    return <></>;
}

export default TodoContainer;