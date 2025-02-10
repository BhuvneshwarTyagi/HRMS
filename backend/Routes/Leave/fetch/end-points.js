const express = require("express");
const router = express.Router();

const { checkHr, check, extractToken } = require("../../../Middleware/auth");
const { LeaveModel } = require("../../../Schemas/model");


router.get("/employee/leaves", extractToken,checkHr, async (req, res) => {
    
        try {
           
            const skip = parseInt(req.query.start) || 0;
            const limit = parseInt(req.query.end) || 15;

            const leaves = await LeaveModel.find().skip(skip).limit(limit).lean();

            res.status(200).json({Leaves: leaves});
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
});


router.get("/leave", extractToken,check, async (req, res) => {
        try {
           
            const id = req.id;
            const skip = parseInt(req.query.start) || 0;
            const limit = parseInt(req.query.end) || 15;
            const leaves = await LeaveModel.find({ id: id }).skip(skip).limit(limit).lean();
            console.log(leaves)
            res.status(200).json({Leaves: leaves});
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
});



module.exports = router;