import React, { useEffect, useState } from 'react';
import TodoBoard from './TodoBoard.jsx';
import Button from '@mui/material/Button';
import { Checkbox} from '@mui/material';
import TextField from '@mui/material/TextField';

export default function InputText() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchData = () =>{
        fetch('http://localhost:4000/api/todo/todolist')
        .then(res => res.json())
        .then(data => setTodoList(data));
    }

    useEffect(() => {fetchData()}, []);

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
        }).then(()=>fetchData());
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
    
    const handleEdit = async (id, newText ,newDone) => {
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

    return (
        <div className='w-full flex flex-col items-center space-y-6 mt-8'>
            <div className='text-5xl font-bold'>To-do List</div>
            <form onSubmit={onSubmitHandler} className='w-full flex items-center justify-center space-x-4'>
                {/* <input 
                    className='w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    name="text" 
                    type="text" 
                    placeholder="새로운 작업을 입력하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                /> */}
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
                
                    <Checkbox name="done" size="small"  />
                </div>

                <Button 
                    variant="contained" 
                    color="info" 
                    type="submit"
                >
                    추가하기
                </Button>
            </form>
            
            <TodoBoard todoList={todoList}  onDelete={handleDelete} onEdit={handleEdit}/>
        </div>

    );
}
