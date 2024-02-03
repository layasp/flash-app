import React, { useState, useEffect } from 'react';

const PlayPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [gameInProgress, setGameInProgress] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/flashcards')
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetchLeaderboard(); // Fetch leaderboard data initially
  }, []);

  const handleStartGame = (name) => {
    setUserName(name);
    setShowForm(false);
    setGameInProgress(true);
  };

  const handleAnswer = (userAnswer) => {
    if (userAnswer === flashcards[currentCardIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (userName && score) {
      if (currentCardIndex === flashcards.length) {
        saveScoreToDatabase(userName, score);
        fetchLeaderboard(); // Fetch updated leaderboard data after submitting
      }
    }
  }, [currentCardIndex, flashcards, score, userName]);

  const saveScoreToDatabase = async (name, userScore) => {
    try {
      await fetch('http://localhost:3001/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: name, score: userScore }),
      });
    } catch (error) {
      console.error('Error saving score to database:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      console.log('Fetching leaderboard...');
      const response = await fetch('http://localhost:3001/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <div>
      <h2>Play Flashcards</h2>
      {flashcards.length === 0 && <p>No flashcards available.</p>}
      {showForm && (
        <div>
          <label htmlFor="userName">Enter your name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => handleStartGame(userName)}>
            Start Game
          </button>
        </div>
      )}
      {gameInProgress && !showForm && flashcards.length > 0 && currentCardIndex < flashcards.length && (
        <div>
          <p>Question: {flashcards[currentCardIndex].question}</p>
          <div>
            <label htmlFor="userAnswer">Your Answer:</label>
            <input type="text" id="userAnswer" />
            <button onClick={() => handleAnswer(document.getElementById('userAnswer').value)}>
              Submit Answer
            </button>
          </div>
        </div>
      )}
      {currentCardIndex === flashcards.length && (
        <div>
          <h3>Total Score: {score}</h3>
          <h4>{userName}, your score is saved!</h4>
        </div>
      )}
      {gameInProgress && (
        <div>
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard
              .slice()
              .sort((a, b) => b.score - a.score)  // Sort in descending order
              .map((entry, index) => (
                <li key={index}>
                  {entry.userName}: {entry.score}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
