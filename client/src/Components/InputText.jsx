import React, { useEffect, useState } from 'react';
import TodoBoard from './TodoBoard.jsx';

export default function InputText() {
    const [todoList, setTodoList] = useState([]);

    const fetchData = () =>{
        fetch('http://localhost:4000/api/todo/todolist')
        .then(res => res.json())
        .then(data => setTodoList(data));
    }

    useEffect(() => {fetchData()}, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const text = e.target.text.value; 
        const done = e.target.done.checked;
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
    };

    return (
        <div className='w-full flex justify-center flex-col items-center'>
            <form onSubmit={onSubmitHandler}>
                <input name="text" type="text" /> 
                <input name="done" type="checkbox" />
                <input type="submit" value='추가' />
            </form>
                
            <TodoBoard todoList={todoList} />
        </div>
    );
}
