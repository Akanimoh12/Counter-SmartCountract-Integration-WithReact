import React from 'react';

function CounterDisplay({ count }) {
  return <div className='text-center my-14 text-white'>
      <p className="text-8xl font-semibold ">{count}</p>
      <p className="text-xl font-bold pulsate-fwd">Current Count</p>
  </div>

}

export default CounterDisplay;