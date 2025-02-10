const express = require("express");
const router = express.Router();
const { EmployeeModel } = require("../Schemas/model");
const { extractToken, checkHr } = require("../Middleware/auth");


router.get("/user/:skip", extractToken,checkHr ,async (req, res) => {
    try {

      const employees = await EmployeeModel.find({},{__v:0,password:0}).skip(parseInt(req.params.skip)).lean();
      res.status(200).json({ employees });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  });

module.exports = router;
