const express = require("express");
const router = express.Router();
const { checkHr, check, extractToken } = require("../../../Middleware/auth");
const { LeaveModel, EmployeeCheck } = require("../../../Schemas/model");
const { default: mongoose } = require("mongoose");

router.put("", extractToken, checkHr, async (req, res) => {
  try {
    const status = req.body.status;
    const leaveId = req.query.leaveId;

    if (!leaveId) {
      throw { message: "Leave Id is not specified" };
    }

    if (!status) {
      throw { message: "status is not specified" };
    }

    const updation = new Map();

    updation.status = status;
    updation.approvedBy = req.id;
    const leave = await LeaveModel.findByIdAndUpdate(leaveId, updation, {
      returnDocument: true,
    }).lean();

    if (leave.type === "Earned Leave" && status.toLowerCase() === "approved") {
      const { startDate, endDate, id: employeeId } = leave;

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        throw { message: "Invalid leave date range" };
      }

      const attendanceRecords = [];
      const currentDate = new Date(start);

      while (currentDate <= end) {
        attendanceRecords.push({
          employeeId: new mongoose.Types.ObjectId(employeeId),
          checkInTime: currentDate,
          checkOutTime: currentDate, 
          duration: 0, 
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      await EmployeeCheck.insertMany(attendanceRecords);
    }
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/delete", extractToken, check, async (req, res) => {

  try {
    const leaveId = req.query.leaveId;

    if (!leaveId) {
      throw { message: "Leave Id is not specified" };
    }

    await LeaveModel.deleteOne({ _id: leaveId, status: "Pending" }).lean();

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }

});

module.exports = router;
