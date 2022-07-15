const { User } = require("../models/User"); //유저모델 가져오기

let auth = (req ,res, next) => {
    //여기에 두 토큰을 비교하는 인증처리 코드를 적는다.
    //index.js에 적은 미들웨어 auth가 이 것이다.

    //클라이언트 쿠키에서 토큰을 가져옵니다.
    let token = req.cookies.x_auth;

    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next(); //미들웨어에서 탈출해 나머지를 진행할 수 있게함.

    })

    //유저가 있으면 인증 Okay
    //유저가 없으면 인증 No

}

module.exports = { auth };