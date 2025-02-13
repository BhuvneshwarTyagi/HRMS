const express = require("express");
const router = express.Router();
const { EmployeeCheck } = require("../../Schemas/model");
const { extractToken, check } = require("../../Middleware/auth");

router.post("/checkin", extractToken, check, async (req, res) => {
  try {
    const { checkInTime } = req.body;
    const employeeId = req.id;
    if (!employeeId || !checkInTime) {
      return res.status(400).json({ message: "employeeId and checkInTime are required!" });
    }
    const date = `${checkInTime}`.split('T')[0];
    const existingCheckIn = await EmployeeCheck.findOne({
      employeeId,
      date,
    });
    console.log(existingCheckIn);
    if (existingCheckIn && existingCheckIn.checkOutTime != null) {
      return res.status(400).json({ message: "Attendace Already Marked" });
    }

    const newCheckIn = await EmployeeCheck.findOneAndUpdate({
      employeeId,
      date,
    }, {
      employeeId,
      date,
      checkInTime: new Date(checkInTime)
    }, { upsert: true, returnDocument: true });

    res.status(201).json({ message: "Checked in successfully!", data: newCheckIn });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/checkout", extractToken, check, async (req, res) => {
  try {
    const { checkOutTime } = req.body;
    const employeeId = req.id;

    if (!employeeId || !checkOutTime) {
      return res.status(400).json({ message: "employeeId and checkOutTime are required!" });
    }
    const date = `${checkOutTime}`.split('T')[0];

    const checkInRecord = await EmployeeCheck.findOne({
      employeeId,
      date
    });
    if (checkInRecord && checkInRecord.checkOutTime != null && new Date(checkInRecord.checkInTime) < new Date(checkInRecord.checkOutTime)) {
      return res.status(400).json({ message: "No active check-in found!" });
    }


    const newCheckIn = await EmployeeCheck.findOneAndUpdate({
      employeeId,
      date,
    }, {
      employeeId,
      date,
      checkOutTime: new Date(checkOutTime)
    });

    res.status(200).json({ message: "Checked out successfully!", data: newCheckIn });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
