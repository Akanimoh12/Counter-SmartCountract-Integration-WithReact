import React, { useState } from 'react';

function SetCountForm({ contract, updateCount }) {
  const [newCount, setNewCount] = useState('');

  const handleSetCount = async () => {
    try {
      const tx = await contract.setCount(newCount);
      await tx.wait();
      if (updateCount) updateCount();
      setNewCount(''); // Clear input
    } catch (error) {
      console.error('Error setting count:', error);
      alert('Failed to set count.');
    }
  };

  return (
    <div className="mt-4 flex space-x-2">
      <input
        type="number"
        value={newCount}
        onChange={(e) => setNewCount(e.target.value)}
        placeholder="Input Count"
        className="bg-gray-300 border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600 w-full"
        onClick={handleSetCount}
      >
        Set Count
      </button>
    </div>
  );
}

export default SetCountForm;