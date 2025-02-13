const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  Name: String,
  contact: String,
  email: {
    required: true,
    type: String
  },
  Aadhaar: String,
  PAN: String,
  bank_details: String,
  emergency_contact: String,
  address: String,
  profile_picture: String,
  HR: Boolean,
  password: String
});

const LeaveSchema = new Schema({
  id: String,
  startDate: String,
  endDate: String,
  reason: String,
  type: String,
  applyOn: String,
  status: String,
  approvedBy: String
});

const EmployeeCheckSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: String,
  checkInTime: {
    type: Date,
    default: Date.now,
  },
  checkOutTime: {
    type: Date,
  },
  duration: {
    type: Number,
  },
});

const PayrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId,ref: "EmployeeDetails", required: true },
  baseSalary: { type: Number, required: true },
  totalDays: { type: Number, required: true },
  presentDays: { type: Number, default: 0 },
  calculatedSalary: { type: Number, default: 0 },
  month: { type: String, required: true },
  by: { type: mongoose.Schema.Types.ObjectId,ref: "EmployeeDetails", required: true },
});

const Payroll = mongoose.model("Payroll", PayrollSchema);


const EmployeeCheck = mongoose.model("EmployeeCheck", EmployeeCheckSchema);
const EmployeeModel = mongoose.model("EmployeeDetails", EmployeeSchema);
const LeaveModel = mongoose.model("Leaves", LeaveSchema);


module.exports = { EmployeeModel, LeaveModel, EmployeeCheck,Payroll };
