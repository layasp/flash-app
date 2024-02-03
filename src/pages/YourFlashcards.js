import React, { useState, useEffect } from 'react';
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

const YourFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // Fetch flashcards from MongoDB or your API endpoint
    // Update the following placeholder URL with your actual API endpoint
    fetch('http://localhost:3001/api/flashcards') // Change 'your-endpoint' to the desired API endpoint
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div>
      <h2>Your Flashcards</h2>
      {flashcards.length === 0 && <p>No flashcards available.</p>}
      {flashcards.length > 0 && (
        <div>
          <FlashCard
            question={flashcards[currentCardIndex].question}
            answer={flashcards[currentCardIndex].answer}
          />
          <div className="navigation-buttons">
            <button onClick={handlePrevCard}>Previous</button>
            <button onClick={handleNextCard}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourFlashcards;
