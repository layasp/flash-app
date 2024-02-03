import React, { useState, useEffect } from 'react';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/flashcards');
      const data = await response.json();
      setFlashcards(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <div className="App">
      <h1>Flash Card App</h1>
      <div className="flashcard-container">
        {flashcards.map((card, index) => (
          <div key={index}>
            <p>Question: {card.question}</p>
            <p>Answer: {card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
