const express = require("express");
const router = express.Router();
const { EmployeeCheck, Payroll } = require("../../Schemas/model");
const { extractToken, checkHr } = require("../../Middleware/auth");

router.post("", extractToken, checkHr, async (req, res) => {
  try {
    const { employeeId, baseSalary, totalDays, month } = req.body;
    const by = req.id;
    if (!employeeId || !baseSalary || !totalDays || !month) {
      return res.status(400).json({ message: "employeeId, baseSalary, totalDays, and month are required!" });
    }

    const presentDays = await EmployeeCheck.countDocuments({ employeeId, checkInTime: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) } });


    const calculatedSalary = (baseSalary / totalDays) * presentDays;

    const payrollRecord = new Payroll({
      employeeId,
      baseSalary,
      totalDays,
      presentDays,
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
