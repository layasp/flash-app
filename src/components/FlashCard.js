import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="front">
        <p>{question}</p>
      </div>
      <div className="back">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FlashCard;


