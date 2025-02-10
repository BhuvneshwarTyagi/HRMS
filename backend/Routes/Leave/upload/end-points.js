const express = require("express");
const router = express.Router();

const { check, extractToken } = require("../../../Middleware/auth");
const { EmployeeModel, LeaveModel } = require("../../../Schemas/model");

router.post("", extractToken,check, async (req, res) => {

   
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const reason = req.body.reason;
            const id = req.id;
            const type = req.body.type;

            const applyOn = req.body.applyOn;

            if (!applyOn) {
                throw { message: "Apply Date is not specified" };
            }
            if (!startDate) {
                throw { message: "Start Date is not specified" };
            }
            if (!endDate) {
                throw { message: "End Date is not specified" };
            }

            if (!reason) {
                throw { message: `Reason is not specified` };
            }

            if (!type) {
                throw { message: `Leave type is not specified` };
            }
            const employeeDoc = await EmployeeModel.findById( id , { _id: 1, name: 1 }).lean();
            if (!employeeDoc) {
                throw { message: "Teacher not found" };
            }

            const output = await LeaveModel.findOneAndUpdate(
                {
                    id: employeeDoc._id,
                    startDate: startDate,
                    endDate: endDate,
                },
                {
                    id: employeeDoc._id,
                    startDate: startDate,
                    endDate: endDate,
                    reason: reason,
                    applyOn: applyOn,
                    type: type,
                    status: "Pending",

                },
                { upsert: true, setDefaultsOnInsert: true, returnDocument: 'after' }
            ).lean();

            res.status(200).json(output);
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
});





module.exports = router;