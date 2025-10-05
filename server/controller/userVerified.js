import User from "../models/userModel.js"

//account verified
export const accountVerified=async(req,res)=>{
  try{
    const userId=req.userId;
    const user=await User.findById(userId);

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      userData:{
        name:user.userName,
        isAccountVerified:user.isAccountVerified
      }
    })

  }catch(error){
     console.log("Unauth Error", error);
    return res.status(500).json({
      success: false,
      message: "Invalid or Expire token.",
    });
  }
}
export default accountVerified;