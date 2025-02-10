const express = require("express");
const router = express.Router();
const { EmployeeModel } = require("../Schemas/model");
const { extractToken, checkHr } = require("../Middleware/auth");

router.get("/:searchString", extractToken, checkHr, async (req, res) => {
    try {
        // Destructure search parameters from request body
        const { searchString } = req.params;

        const regex = new RegExp(searchString, 'i');


        const employees = await EmployeeModel.aggregate([
            {
                $match: {
                    $or: [
                        { email: regex },
                        { Name: regex },
                        { contact: regex },
                        { Aadhaar: regex },
                        { PAN: regex }
                    ]
                }
            },
            {
                $project: {
                    Name: 1,
                    _id: 1
                }
            }
        ])

        res.status(200).json({
            employees,

        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

module.exports = router;