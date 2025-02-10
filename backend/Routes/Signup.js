const express = require("express");
const { extractToken, checkHr } = require("../Middleware/auth");
const router = express.Router();
const {EmployeeModel} = require('./../Schemas/model');
const { hashdata } = require("../utils/hashData");

router.post("/employee",extractToken,checkHr, async (req, res) => {
  try {
    let {
      Name,
      contact,
      email,
      Aadhaar,
      PAN,
      bank_details,
      emergency_contact,
      address,
      profile_picture,
      HR
    } = req.body;

    console.log(req.body);
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw { message: "Invalid email entered" };
    }
    password = await hashdata(Aadhaar);
    const newUser = new EmployeeModel({
        Name,
        contact,
        email,
        Aadhaar,
        PAN,
        bank_details,
        emergency_contact,
        address,
        profile_picture,
        HR,
        password
    });

    await newUser.save().then((value) => {
      res.status(200).json({
        status: true,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
