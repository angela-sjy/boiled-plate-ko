module.exports = {
    //heroku의 config vars에서 설정한 이름(MONGO_URI)와 아래의 변수 이름은 동일해야한다.
    mongoURI: process.env.MONGO_URI
}