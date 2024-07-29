import React from 'react';
import TodoItem from './TodoItem.jsx';

export default function TodoBoard({ todoList, onDelete }) {
    return (
        <div className='w-full flex justify-center py-4'>
            <div className='w-full max-w-2xl overflow-y-auto bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-md flex flex-col-reverse'>
                {todoList?.map((item) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}
