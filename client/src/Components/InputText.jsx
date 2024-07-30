import React, { useEffect, useState } from 'react';
import TodoBoard from './TodoBoard.jsx';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function InputText() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // 필터 상태 추가

    const fetchData = () => {
        fetch('http://localhost:4000/api/todo/todolist')
            .then(res => res.json())
            .then(data => setTodoList(data));
    }

    useEffect(() => {
        fetchData();

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                if (todoList.length > 0) {
                    handleDelete(todoList[todoList.length - 1].id);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [todoList]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const text = e.target.text.value.trim();
        const done = e.target.done.checked;

        if (text === '') {
            alert('할 일을 입력해 주세요.');
            return;
        }
        fetch('http://localhost:4000/api/todo/todolist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                text, 
                done 
            }),
        }).then(() => fetchData());
        setInputValue('');
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:4000/api/todo/tododelete/${id}`, {
                method: 'DELETE',
            });
            fetchData(); // 삭제 후 상태 업데이트
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = async (id, newText, newDone) => {
        try {
            await fetch(`http://localhost:4000/api/todo/todoupdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText, done: newDone }),
            });
            fetchData(); // Update the list after editing
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    const filteredTodoList = todoList.filter(todo => {
        if (filter === 'completed') return todo.done;
        if (filter === 'pending') return !todo.done;
        return true; // 'all'
    });

    return (
        <div className='w-full flex flex-col items-center space-y-6 mt-8'>
            <div className='text-5xl font-bold'>To-do List</div>
            <form onSubmit={onSubmitHandler} className='w-full flex items-center justify-center space-x-4'>
                <TextField
                    className='w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    label="새로운 작업을 입력하세요"
                    variant="outlined"
                    name="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className='flex flex-col items-center'>
                    <label className='text-gray-600'>Done</label>
                    <Checkbox name="done" size="small" />
                </div>

                <Button 
                    variant="contained" 
                    color="info" 
                    type="submit"
                >
                    추가하기
                </Button>
            </form>

            <div className='w-full flex justify-center space-x-4'>
                <FormControl className='w-2/4'>
                    <InputLabel id="filter-label">필터</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        label="필터"
                    >
                        <MenuItem value="all">모두</MenuItem>
                        <MenuItem value="completed">완료된 항목</MenuItem>
                        <MenuItem value="pending">미완료 항목</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TodoBoard todoList={filteredTodoList} onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
    );
}
