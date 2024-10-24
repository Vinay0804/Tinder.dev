const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
    },
    lastName :{
        type : String
    },
    email :{
        type : String,
        lowercase:true,
        required : true,
        unique :true,
        trim : true,
    },
    password :{
        type :String,
        required : true
    },
    age :{
        type : Number,
        min:18,
        max:100
    },
    gender :{
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data i not valid")
            }
        }
    },
    about :{
        type : String,
        default : "I was a developer working under xyz company"
    },
    skills :{
        type :[String]
    },

    
},{
    timestamps:true,
})

module.exports = mongoose.model("User", userSchema);