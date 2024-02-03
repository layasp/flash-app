import React, { useState } from 'react';
import './custom.css';
const CustomizeFlashcards = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState(''); 

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer, type }),
      });

      const savedFlashCard = await response.json();

     
      onSave(savedFlashCard);

     
      setQuestion('');
      setAnswer('');
      setType('');
    } catch (error) {
      console.error('Error saving flashcard:', error);
    }
  };

  return (
    <div>
      <h2>Custom Flashcard</h2>
      <div>
        <label htmlFor="question">Question:</label>
        <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div>
        <label htmlFor="answer">Answer:</label>
        <input type="text" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </div>
      <div>
        <label htmlFor="type">Type (Flashcard Set Name):</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save Flashcard</button>
    </div>
  );
};

export default CustomizeFlashcards;
