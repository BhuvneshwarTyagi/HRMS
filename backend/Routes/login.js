const express = require("express");
const router = express.Router();
const { createRefreshToken, createAccessToken } = require("../utils/createToken");
const { verifyHashedData } = require('../utils/hashData');
const { EmployeeModel } = require("../Schemas/model");


router.post("/employee", async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email) {
            throw { message: "Empty email supplied" };
        }

        if (!password) {
            throw { message: "Empty password supplied" };
        }

        email = email.trim();
        password = password.trim();



        var fetchedUser = await EmployeeModel.findOne(
            {
                email
            },
            {
                __v: 0,
            }
        ).lean();

        if (!fetchedUser) {
            throw { message: "No user found" };
        }

        const hashedPassword = fetchedUser.password;

        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw { message: "Invalid password entered" };
        }

        //create user token 
        delete fetchedUser.password;
        const tokenData = {
            id:fetchedUser._id,
            designation: fetchedUser.HR ?  "HR" : "Employee",
        };

        const accessToken = createAccessToken(tokenData);
        const refreshToken = createRefreshToken(tokenData);

        //assign user token 

        tokens = { "accessToken": accessToken, "refreshToken": refreshToken };

        delete fetchedUser._id;
        res.status(200).json({ userDetails: fetchedUser, tokens });

    } catch (error) {

        res.status(400).json({
            error: error.message,
        });
    }
});



module.exports = router;