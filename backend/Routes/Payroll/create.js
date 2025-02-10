const express = require("express");
const router = express.Router();
const { EmployeeCheck, Payroll } = require("../../Schemas/model");
const { extractToken, checkHr } = require("../../Middleware/auth");

router.post("",extractToken,checkHr, async (req, res) => {
  try {
    const { employeeId, baseSalary, totalDays, month } = req.body;
    const by = req.id;
    if (!employeeId || !baseSalary || !totalDays || !month) {
      return res.status(400).json({ message: "employeeId, baseSalary, totalDays, and month are required!" });
    }

    const presentDays = await EmployeeCheck.aggregate([
      { $match: { employeeId, checkInTime: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) } } },
      { $group: { _id: { $dayOfMonth: "$checkInTime" } } },
      { $count: "presentDays" },
    ]);

    const numPresentDays = presentDays.length > 0 ? presentDays[0].presentDays : 0;

    const calculatedSalary = (baseSalary / totalDays) * numPresentDays;

    const payrollRecord = new Payroll({
      employeeId,
      baseSalary,
      totalDays,
      presentDays: numPresentDays,
      calculatedSalary,
      month,
      by
    });

    await payrollRecord.save();

    res.status(201).json({ message: "Payroll calculated successfully!", data: payrollRecord });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
