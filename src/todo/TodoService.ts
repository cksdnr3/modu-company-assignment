import { useState, useEffect } from 'react';
import { formatDate } from 'utils/formatDate';
import dummyData from 'assets/dummyData.json'

export enum status {
    PENDING = 'pending',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
} 

export enum importance {
    LOW, MID, HIGH
}

export type Todo = {
    [key: string]: string | number | undefined;
    id: number;
    task: string;
    status: string;
    importance: number;
    createdAt: string;
    updatedAt?: string;
}

export const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>(dummyData);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData();
    }, [todos]);

    // Task 추가 
    const createTodo = () => {
        const createdAt = formatDate(new Date());
    };

    // Task 삭제
    const removeTodo = () => {

    };

    // Task 상태 변경


    const loadData = () => {
        let data = localStorage.getItem('todos');
        if (data === null) return;
        setTodos(JSON.parse(data));
    };

    const saveData = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    return { todos };
}