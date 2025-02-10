const bcrypt=require("bcrypt");

const hashdata = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
};


const verifyHashedData=async(unhashed,hashed)=>{

        const match =await bcrypt.compare(unhashed,hashed);

        return match;
        
}
module.exports={hashdata,verifyHashedData};
