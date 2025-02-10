const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  Name: String,
  contact: String,
  email: String,
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
    id:String,
    startDate: String,
    endDate: String,
    reason:String,
    type: String,
    applyOn:String,
    status: String,
    approvedBy: String
});



const EmployeeModel = mongoose.model("EmployeeDetails", EmployeeSchema);
const LeaveModel = mongoose.model("Leaves", LeaveSchema);


module.exports = { EmployeeModel,LeaveModel };
