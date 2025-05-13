const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  date: String,
  employee: String,
});
const Shift = mongoose.model('Shift', ShiftSchema);

const AllocationSchema = new mongoose.Schema({
  shiftId: String,
  employee: String,
});
const Allocation = mongoose.model('Allocation', AllocationSchema);

const ClockinSchema = new mongoose.Schema({
  shiftId: String,
  employee: String,
  time: String,
});
const Clockin = mongoose.model('Clockin', ClockinSchema);

module.exports = {
  Shift,
  Allocation,
  Clockin,
};