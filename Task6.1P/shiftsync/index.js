// === Minimal ShiftSync Backend (Node.js + No DB) ===

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy in-memory data
let shifts = [
  { id: 1, date: '2024-04-10', time: '09:00 - 17:00' }
];

let clockins = [];

app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => res.send('ShiftSync backend is running'));

// GET all shifts
app.get('/shifts', (req, res) => {
  res.json(shifts);
});

// POST a new shift
app.post('/shifts', (req, res) => {
  const { date, time } = req.body;
  const newShift = { id: shifts.length + 1, date, time };
  shifts.push(newShift);
  res.status(201).json({ message: 'Shift created', shift: newShift });
});

// POST clock-in for user
app.post('/clockin', (req, res) => {
  const { user_id, shift_id } = req.body;
  const timestamp = new Date().toISOString();
  clockins.push({ user_id, shift_id, clock_in: timestamp });
  res.json({ message: 'Clock-in successful', time: timestamp });
});

app.listen(PORT, () => console.log(`ShiftSync backend running on port ${PORT}`));
