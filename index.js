const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded (이러한 형태의 데이터를 분석해서 가져올 수 있게함 )
app.use(bodyParser.urlencoded({extended: true}));

//application/json (json파일 분석후 가져오게 함)
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://angela-sjy:rururi98@angela-project.cubvlzt.mongodb.net/?retryWrites=true&w=majority',{}).then(() => console.log('MongoDB Connected...'))
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.post('/register',(req,res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어줍니다.

  const user = new User(req.body)

  user.save((err,doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    }) 
  })
})

app.post('/login',(req, res) => {
  
  //요청한 이메일을 DB에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err,user) => {
    if(!user) { //user가 없는 상황
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    
    //요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."}) 
      
      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //저 user에 이미 토큰이 있다. 이 토큰을 저장한다. 어디에?
        //쿠키 or 로컬 스토리지 (여기에선 쿠키에) -> 쿠키 파서 설치
        res.cookie("x_auth", user.token)
        .status(200) //쿠키에 저장 성공
        .json({ loginSuccess: true, userId: user._id })
    
        

      })
    })


  })

  
  //비밀번호까지 맞다면 토큰을 생성한다.

} )

//로그아웃 route
app.get('/api/users/logout',auth, (res, req) => {

  User.findOneAndUpdate({ _id: req.user._id},
    { token: ""}
    , (err,user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})



app.get('/', (req, res) => {
  res.send('여름방학 기간이네요')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})