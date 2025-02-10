const express = require("express");

const router=express.Router();

const apply=require("./../upload/index");
const fetch=require("./../fetch/index");
const update=require("./../update/index");

router.use("/apply",apply);
router.use("/fetch",fetch);
router.use("/update",update);

module.exports=router;