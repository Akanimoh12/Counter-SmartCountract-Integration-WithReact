import React from 'react';

function IncrementButton({ contract, updateCount }) {
  const handleIncrement = async () => {
    try {
      const tx = await contract.increment();
      await tx.wait(); // Wait for transaction confirmation
      if (updateCount) updateCount();
    } catch (error) {
      console.error('Error incrementing:', error);
      alert('Failed to increment. Only the owner can call this function.');
    }
  };

  return (
    <button
      className="px-4 py-2 w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      onClick={handleIncrement}
    >
      Increment
    </button>
  );
}

export default IncrementButton;