const express = require("express");
const router = express.Router();
const { EmployeeModel } = require("../Schemas/model");
const { extractToken, checkHr } = require("../Middleware/auth");

router.put("/user/:id", extractToken,checkHr ,async (req, res) => {
  try {
    await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body
    ).lean();

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/user/:id", extractToken,checkHr ,async (req, res) => {
    try {
        
      await EmployeeModel.findByIdAndDelete(
        req.params.id
      ).lean();
  
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  });

module.exports = router;
