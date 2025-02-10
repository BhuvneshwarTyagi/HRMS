const express = require("express");
const router = express.Router();
const { EmployeeCheck } = require("../../Schemas/model");
const { extractToken, check } = require("../../Middleware/auth");


router.get("", extractToken, check, async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({ message: "userId and date are required!" });
    }



    const records = await EmployeeCheck.find({
      employeeId: userId,
    }, {
      _id: 0,
      __v: 0,
      employeeId: 0
    },

    ).sort({ checkInTime: -1 });

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for the given date." });
    }

    res.status(200).json({ message: "Records fetched successfully!", data: records });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
