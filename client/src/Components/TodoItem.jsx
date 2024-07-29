import React from 'react';

export default function TodoItem({ item, onDelete }) {
    return (
        <div className='w-full flex justify-center py-2'>
            <div className='w-full max-w-xl bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between'>
                <div className='flex flex-col'>
                    <span className='text-lg font-semibold text-gray-800'>
                        {item.text}
                    </span>
                    <span className={`text-sm ${item.done ? 'text-green-600' : 'text-red-600'}`}>
                        {item.done ? '완료' : '미완료'}
                    </span>
                </div>
                <div className='flex space-x-2'>
                    <button
                        className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        // onClick={() => onEdit(item)}
                    >
                        수정
                    </button>
                    <button
                        className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                        onClick={() => onDelete(item.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
