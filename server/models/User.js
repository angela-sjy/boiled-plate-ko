const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    password: {
        type: String,
        minlength: 5
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

//정보를 저장하기전에 수행하는 암호화 과정
userSchema.pre('save', function( next ){
    var user = this;

    //비밀번호를 바꿀 때에만 암호를 걸어줘야함. 
    //다른 정보 변경시에는 그대로여야함.
    if(user.isModified('password')){

    //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err) return next(err)  //에러 발생 시 index.js의 user.save()로 보낸다.
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash //오류가 없을 경우 비밀번호를 해시된 것으로 바꿔줌
                next()
                //myPlaintextPassword(여기선 user.password)는 postman에서 사용한 pw를 의미한다.
                
            })
        })
    } else { //비밀번호를 바꾸는게 아닌 다른걸 바꿀 때엔 바로 user.save()로 보낸다.
        next()
    }
   
})


userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword(1234567)과 DB에 있는 암호화된 비밀번호를 비교해야함.
    //그러므로 plainPassword를 암호화해서 DB의 번호(this.password)과 비교해야한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err); //같지 않음. 에러 발생
        cb(null, isMatch); //같음. index.js의 user.comparePassword로 이동
    })
}   

userSchema.methods.generateToken = function(cb) {
    var user = this
    
    //jsonwebtoken을 이용해서 토큰을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // 나중에 token 해석 시 'secretToken'을 넣으면 user._id가 나온다.

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id +'secretToken' = token
    // 토큰을 decode 한다. (복호화)
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
        user.findOne({ "_id": decoded, "token": token }, function (err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = {User}