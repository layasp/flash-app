
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const mongoURI = 'mongodb+srv://srilayasekar:N94MjeJofaXNAHbl@cluster0.62ih7dj.mongodb.net/laya';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const flashCardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  type: String,
});
const reactschema = new mongoose.Schema({
  question: String,
  answer: String,
});
const leaderboardSchema = new mongoose.Schema({
  userName: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

const FlashCard = mongoose.model('FlashCard', flashCardSchema);
const ReactCard = mongoose.model('react', reactschema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

app.use(cors());
app.use(express.json());



app.get('/api/flashcards', async (req, res) => {
  try {
    const flashcards = await FlashCard.find();
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/react', async (req, res) => {
  try {
    const reactcards = await ReactCard.find();
    res.json(reactcards);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    console.log("helloooo");
    const leaderboardData = await Leaderboard.find().sort({ score: -1 });
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  try {
    const { userName, score } = req.body;
    const newLeaderboardEntry = new Leaderboard({ userName, score });
    const savedLeaderboardEntry = await newLeaderboardEntry.save();
    res.json(savedLeaderboardEntry);
  } catch (error) {
    console.error('Error saving leaderboard entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/flashcards', async (req, res) => {
  try {
    const { question, answer, type } = req.body;
    const newFlashCard = new FlashCard({ question, answer, type });
    const savedFlashCard = await newFlashCard.save();
    res.json(savedFlashCard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
