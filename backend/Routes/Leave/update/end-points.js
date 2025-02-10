const express = require("express");
const router = express.Router();
const { checkHr, check, extractToken} = require("../../../Middleware/auth");
const { EmployeeModel, LeaveModel } = require("../../../Schemas/model");

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
    await LeaveModel.findByIdAndUpdate(leaveId, updation, {
      returnDocument: false,
      returnOriginal: true,
    }).lean();

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/delete", extractToken,check, async (req, res) => {

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
