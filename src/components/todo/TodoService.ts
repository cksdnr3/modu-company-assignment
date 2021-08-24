import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';

export const status = {
    PENDING: 'pending',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
}

export type Todo = {
    id: number;
    task: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Task 추가
    const createTodo = () => {
        const createdAt = formatDate(new Date());
    };

    // Task 삭제
    const removeTodo = () => {

    };

    // Task 상태 변경
    const changeStatus = () => {

    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData();
    }, [todos]);

    const loadData = () => {
        let data = localStorage.getItem('todos');
        setTodos(JSON.parse(data!));
    };

    const saveData = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    return { todos };
}