const mongoose=require("mongoose");

const {MONODBB_URI} = require("./../env") ;
const connectToDB =async()=>{
    try {
        await mongoose.connect(MONODBB_URI,{dbName:"HRMS"});
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};

connectToDB();