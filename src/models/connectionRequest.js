const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status :{
        type : String,
        required : true,
        enum: {
            values: ['interested', 'ignored','accepted','rejected'],
            message: '{VALUE} is not supported'
          }
    }
},{
    timestamps : true
})

connectionRequestSchema.index({fromUserId : 1,toUserId : -1});

connectionRequestSchema.pre("save",function (next){
    
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("cannot send request to same account")
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports = ConnectionRequest;