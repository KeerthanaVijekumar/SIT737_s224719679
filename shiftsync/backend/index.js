const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
console.log("MONGO_URL =", process.env.MONGO_URL); // Debug line

const path = require('path');

const { Shift, Allocation, Clockin } = require('./model');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB error:", err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/employee.html')); 
});


// === SHIFT APIs ===
app.get('/shifts', async (req, res) => {
  const shifts = await Shift.find();
  res.json(shifts);
});

app.post('/shifts', async (req, res) => {
  const { date, time } = req.body;
  const newShift = new Shift({ date, time });
  await newShift.save();
  res.status(201).json({ message: 'Shift created', shift: newShift });
});

// === ALLOCATION ===
app.post('/allocate', async (req, res) => {
  const { employee_id, shift_id } = req.body;
  const newAlloc = new Allocation({ employee_id, shift_id });
  await newAlloc.save();
  res.json({ message: 'Shift allocated', allocation: newAlloc });
});

// === CLOCK-IN ===
app.post('/clockin', async (req, res) => {
  const { user_id, shift_id } = req.body;
  const timestamp = new Date().toISOString();
  const clock = new Clockin({ user_id, shift_id, clock_in: timestamp });
  await clock.save();
  res.json({ message: 'Clock-in successful', time: timestamp });
});

// === CLOCK-OUT ===
app.post('/clockout', async (req, res) => {
  const { user_id, shift_id } = req.body;
  const clock = await Clockin.findOne({ user_id, shift_id, clock_out: null });
  if (!clock) return res.status(404).json({ error: 'No active clock-in' });

  clock.clock_out = new Date().toISOString();
  await clock.save();
  res.json({ message: 'Clock-out successful', time: clock.clock_out });
});

// === VERSION (Task 6.2C) ===
app.get('/version', (req, res) => {
  res.json({ version: '3.0.0-mongo', updated: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`ShiftSync backend running on port ${PORT}`);
});
