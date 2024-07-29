import React, { useState } from 'react';

export default function TodoItem({ item, onDelete, onEdit }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newText, setNewText] = useState(item.text);
    const [newDone, setNewDone] = useState(item.done);

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
  };


    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleSaveClick = () => {
        onEdit(item.id, newText, newDone);
        setIsModalOpen(false);
    };

    const handleCancelClick = () => {
        setIsModalOpen(false);
        setNewText(item.text);
        setNewDone(item.done);
    };

    return (
        <div className='w-full flex justify-center py-2'>
            <div className='w-full max-w-xl bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between'>
                <div className='flex flex-col'>
                    <span className='text-lg font-semibold text-gray-800'>
                    {formatDate(item.date)} <br/> {item.text}
                    </span>
                    <span className={`text-sm ${item.done ? 'text-green-600' : 'text-red-600'}`}>
                        {item.done ? '완료' : '미완료'}
                    </span>
                </div>
                <div className='flex space-x-2'>
                    <button
                        className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={handleEditClick}
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">할 일 수정</h2>
                        <input
                            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                        <div className="flex items-center mb-4">
                            <input
                                className="form-checkbox h-4 w-4 text-blue-600"
                                type="checkbox"
                                checked={newDone}
                                onChange={(e) => setNewDone(e.target.checked)}
                            />
                            <label className="ml-2 text-gray-700">완료 여부</label>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={handleSaveClick}
                            >
                                저장
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                onClick={handleCancelClick}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
