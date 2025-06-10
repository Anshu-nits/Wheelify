import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    registeredBikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bike", 
    }],
    providedBikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bike", 
    }],
    rentalHistory: [
        {
          bike: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bike" ,
          },
          action: { type: String }, 
          timestamp: { type: Date, default: Date.now },
        },
    ],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bike", 
    }]
});

const User = mongoose.model("User", userSchema);
export default User;