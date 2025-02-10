const express = require("express");
const router = express.Router();

const { checkHr, check, extractToken } = require("../../../Middleware/auth");
const { LeaveModel } = require("../../../Schemas/model");


router.get("/employee/leaves", extractToken, checkHr, async (req, res) => {

    try {

        const skip = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.end) || 15;

        const leaves = await LeaveModel.aggregate([
            {
                $addFields: {
                    id: { $toObjectId: "$id" }
                }
            },
            {
                $lookup: {
                    from: "employeedetails",
                    localField: "id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $project: {
                    "_id": 1,
                    "startDate": 1,
                    "endDate": 1,
                    "applyOn": 1,
                    "reason": 1,
                    "status": 1,
                    "type": 1,

                    "employee.Name": 1,
                    "employee.profile_picture": 1,
                }
            },
            {
                $sort: {
                    applyOn: -1
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: limit
            }
        ]);

        res.status(200).json({ Leaves: leaves });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


router.get("/leave", extractToken, check, async (req, res) => {
    try {

        const id = req.id;
        const skip = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.end) || 15;
        const leaves = await LeaveModel.find({ id: id }).skip(skip).limit(limit).lean();

        res.status(200).json({ Leaves: leaves });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});



module.exports = router;