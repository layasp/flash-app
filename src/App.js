import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExploreFlashcards from './pages/ExploreFlashcards';
import CustomizeFlashcards from './pages/CustomizeFlashcards';
import YourFlashcards from './pages/YourFlashcards';
import PlayPage from './pages/PlayPage';
import './App.css';
import { Home } from './pages/Home.js';

const App = () => {
  const [explorePageActive, setExplorePageActive] = useState(false);

  const handleSaveFlashcard = (flashcard) => {
    // Handle saving the flashcard data (e.g., send to server)
    console.log('Saving flashcard:', flashcard);
  };

  return (
    <Router>
      <div className={`App ${explorePageActive ? 'hidden' : ''}`}>
        <div className="dashboard">
          <Link to="/explore" onClick={() => setExplorePageActive(true)}>Explore Flashcards</Link>
          <Link to="/customize">Customize Flashcards</Link>
          <Link to="/your">Your Flashcards</Link>
          <Link to="/play">Play!</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route
            path="/explore"
            element={<ExploreFlashcards setExplorePageActive={setExplorePageActive} />}
          />
          <Route path="/customize" element={<CustomizeFlashcards onSave={handleSaveFlashcard}  />} />
          <Route path="/your" element={<YourFlashcards />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </div>
    </Router>

    
  );
};

export default App;
