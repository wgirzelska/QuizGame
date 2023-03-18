import React, { useState } from 'react';
import './style1.css';
import Play from './Categories/Play';
import PlayBiology from './Categories/PlayBiology';
import PlayHistory from './Categories/PlayHistory';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
      <>
      {!selectedCategory && (
        <>
        <div className='single'>
        <br />
        <br />
        <br />
        <h1>Choose category</h1>
          <button onClick={() => setSelectedCategory('Geography')}>
            Geography
          </button>
          <button onClick={() => setSelectedCategory('Biology')}>
            Biology
          </button>
          <button onClick={() => setSelectedCategory('History')}>
            History
          </button>
        </div>
        </>
      )}
      {selectedCategory === 'Geography' && <Play />}
      {selectedCategory === 'Biology' && <PlayBiology />}
      {selectedCategory === 'History' && <PlayHistory />}
    </>
  );
};

export default Categories;
