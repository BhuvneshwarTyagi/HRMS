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

    const existingCheckIn = await EmployeeCheck.findOne({
      employeeId,
      checkOutTime: null,
    });

    if (existingCheckIn) {
      return res.status(400).json({ message: "Already checked in!" });
    }

    const newCheckIn = new EmployeeCheck({
      employeeId,
      checkInTime: new Date(checkInTime),
    });

    await newCheckIn.save();

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

    const checkInRecord = await EmployeeCheck.findOne({
      employeeId,
      checkOutTime: null,
    });

    if (!checkInRecord) {
      return res.status(400).json({ message: "No active check-in found!" });
    }

    checkInRecord.checkOutTime = new Date(checkOutTime);

    checkInRecord.duration = Math.round(
      (checkInRecord.checkOutTime - checkInRecord.checkInTime) / (1000 * 60)
    );

    await checkInRecord.save();

    res.status(200).json({ message: "Checked out successfully!", data: checkInRecord });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
