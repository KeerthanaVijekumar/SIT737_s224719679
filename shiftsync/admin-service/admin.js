const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { Shift, Allocation } = require('./model');
const app = express();
const PORT = process.env.PORT || 3000;

console.log("MONGO_URL =", process.env.MONGO_URL);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB error:", err);
});

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// === Create a Shift ===
app.post('/shifts', async (req, res) => {
  console.log('POST /shifts body:', req.body);  // Debug log to verify body

  const { shiftId, date, startTime, endTime } = req.body;

  if (!shiftId || !date || !startTime || !endTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingShift = await Shift.findOne({ shiftId });
    if (existingShift) {
      return res.status(409).json({ message: 'Shift ID already exists' });
    }

    const newShift = new Shift({ shiftId, date, startTime, endTime });
    await newShift.save();
    console.log('Shift saved:', newShift);

    res.status(201).json({ message: 'Shift published', shift: newShift });
  } catch (err) {
    console.error('Error creating shift:', err);
    res.status(500).json({ message: 'Failed to create shift' });
  }
});

// === View All Shifts ===
app.get('/shifts', async (req, res) => {
  const shifts = await Shift.find();
  res.json(shifts);
});

// === Approve a Shift Allocation ===
app.put('/approve', async (req, res) => {
  const { employee_id, shift_id } = req.body;

  const allocation = await Allocation.findOne({ employee_id, shift_id });
  if (!allocation) return res.status(404).json({ error: 'Allocation not found' });

  allocation.approved = true;
  await allocation.save();

  res.json({ message: 'Shift approved', allocation });
});

// === View Approved Allocations ===
app.get('/allocations', async (req, res) => {
  const allocations = await Allocation.find({ approved: true });
  res.json(allocations);
});

// === VERSION ===
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0-admin', updated: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Admin service running on port ${PORT}`);
});