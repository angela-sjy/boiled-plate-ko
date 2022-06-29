const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //입력에서 빈칸이 있을 시에 그걸 없애준다.
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50 
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}