const express = require("express");

const router=express.Router();

const create=require("./create");
const fetch=require("./fetch");


router.use("/create",create);
router.use("/fetch",fetch);

module.exports=router;