const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded (이러한 형태의 데이터를 분석해서 가져올 수 있게함 )
app.use(bodyParser.urlencoded({extended: true}));

//application/json (json파일 분석후 가져오게 함)
app.use(bodyParser.json());

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



app.get('/', (req, res) => {
  res.send('여름방학 기간이네요')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})