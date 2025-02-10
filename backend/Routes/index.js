const express = require("express");
const router = express.Router();

const signup = require('./Signup');
const login = require('./login');
const leave = require('./Leave/routes/index');
const update = require('./updateEmployees');
const fetch = require('./fetchEmployees');
const attendance = require('./CheckInOut/index');
const payroll = require('./Payroll/index');
const searchUser = require('./searchUser');








router.use('/signup',signup);
router.use('/login',login);
router.use('/leave',leave);
router.use('/update',update);
router.use('/fetch',fetch);
router.use('/attendance',attendance);
router.use('/payroll',payroll);
router.use('/searchUser',searchUser);








module.exports = router;