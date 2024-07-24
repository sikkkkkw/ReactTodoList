import React from 'react';

export default function TodoItem({ item }) {
    return (
        <div className='w-full flex justify-center '>
            <div>
                {item.id}: {item.text} {item.done ? "Y" : "N"}
            </div>
        </div>
    );
}
