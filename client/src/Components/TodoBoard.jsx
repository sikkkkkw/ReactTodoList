import React from 'react';
import TodoItem from './TodoItem.jsx';

export default function TodoBoard({ todoList }) {
    return (
        <div className='flex w-full justify-center'>
            <div className='flex flex-col'>
                <h1>ToDoList</h1>
                {todoList?.map((item) => (
                    <TodoItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
