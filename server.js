//----------------------------------------------------------------------정식모듈
const express = require('express');//익스프레스모듈
const session = require('express-session');
const app = express();//익스프레스 모듈
const path = require('path');//파일경로모듈
const bodyParser = require('body-parser');//http요청 본문처리 모듈
const httpServer = require("http").createServer();//소켓연결을 위해 서버 생성
const cors = require('cors');
require('dotenv').config(); // dotenv를 사용하여 .env 파일을 로드합니다.
const axios = require('axios'); // 엑시오스
const cookieParser = require('cookie-parser'); //쿠키파서
//----------------------------------------------------------------------나의 코드 모듈
const sql = require('./Hooks/mysql.js'); // sql 모듈을 가져옴
const GitHubApi = require('./Hooks/GitHubApi.js');
//----------------------------------------------------------------------모든 요청에대해 정지된아이피 감지
app.use(cors({
  origin: 'http://jungsonghun.iptime.org:3000',  // 클라이언트의 URL
  credentials: true  // 쿠키를 허용하도록 설정
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../memoplanner/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('bothpa'));
//----------------------------------------------------------------------서버 오픈
const port = 7223;
app.listen(port, function () {
  console.log(port+'포트로 서버 오픈')
}); 
//----------------------------------------------------------------------세션
// app.use(session({
//   secure: true,	// https 환경에서만 session 정보를 주고받도록처리
//   secret: process.env.COOKIE_SECRET, // 암호화하는 데 쓰일 키
//   resave: false, // 세션을 언제나 저장할지 설정함
//   saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
//   cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
//     httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
//     Secure: true
//   },
//   name: 'session-cookie' // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
// }));
//----------------------------------------------------------------------스캐줄 넘기기
app.get('/userSchedule/:year/:month',async(req, res, next) => {
  console.log(req.ip)
  const { year, month } = req.params;
  const accessToken = req.headers.authorization;
  const userid = await GitHubApi.GitHubApi(accessToken)
  if(!userid)
    {
      res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
      return;
    }
  console.log("id : "+userid+"가 "+year+"년"+month+"월 일정을 요청"+ "ip : " + req.ip);
  sql.GetSchedule(year, month, userid, (result, values) => {
    if(result) 
    {
      if(values){
        // 검색 성공 결과 나옴
        // console.table(values)
        res.status(200).json({success: true, data:values});
      }else{
        // 검색결과 없음
        res.status(200).json({success:false, data:null,message: "검색 결과 없음"});
      }
    } else 
    {
      //데이터 베이스 접속 실패
      res.status(401).json({ success: false, message: "조회 실패" });
    }
  });
});
//----------------------------------------------------------------------스캐줄 삽입
app.post('/userSchedule/insert',async(req, res, next) => {
    const {year, month, day, color, usertext } = req.body;
    const accessToken = req.headers.authorization;
    const userid = await GitHubApi.GitHubApi(accessToken)
    if(!userid)
    {
      res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
      return;
    }
    console.log(userid + "의 스캐줄 삽입 요청 "+year+"년 "+month+"월 "+day+"일 "+color+"색으로 "+usertext+"내용을");
    sql.InsertSchedule(year, month, day, color, usertext, userid, (result, values) => {
      if(result) 
      {
        res.status(200).json({success: true});
      } else 
      {
        //데이터 베이스 접속 실패
        res.status(401).json({ success: false, message: "입력 실패" });
      }
    });
  });
//----------------------------------------------------------------------스캐줄 수정
app.put('/userSchedule/update',async(req, res, next) => {
    const {year, month, day, color, usertext, id} = req.body;
    const accessToken = req.headers.authorization;
    const userid = await GitHubApi.GitHubApi(accessToken)
    if(!userid)
    {
      res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
      return;
    }
    console.log(userid + "의 스캐줄 수정 요청 "+id+"번 로우에 "+year+"년 "+month+"월 "+day+"일 "+color+"색으로 "+usertext+"내용을");
    sql.UpdateSchedule(year, month, day, color, usertext, userid, id, (result, values) => {
      if(result) 
      {
        res.status(200).json({success: true});
      } else 
      {
        //데이터 베이스 접속 실패
        res.status(401).json({ success: false, message: "입력 실패" });
      }
    });
  });
//----------------------------------------------------------------------스캐줄 삭제
app.delete('/userSchedule/delete/:id',async(req, res, next) => {
    const {id} = req.params;
    const accessToken = req.headers.authorization;
    const userid = await GitHubApi.GitHubApi(accessToken)
    if(!userid)
    {
      res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
      return;
    }
    console.log(userid + "의 스캐줄 삭제 요청 "+id+"번")
    sql.DeleteSchedule(userid, id, (result, values) => {
      if(result) 
      {
        res.status(200).json({success: true});
      } else 
      {
        //데이터 베이스 접속 실패
        res.status(401).json({ success: false, message: "입력 실패" });
      }
    });
  });
//----------------------------------------------------------------------깃허브 로그인
app.post("/account/github/login",async(req, res, next) => {
  console.log("깃허브 로그인?")
  const data = req.body;
  try{
      const restoken = await axios.post("https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: data.code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )

    if(restoken.status === 200)
    {
      try{
        console.table(restoken.data);
        const access_token = restoken.data.access_token;
        const refreshToken = restoken.data.refresh_token;
        const data2 = await axios.get(`https://api.github.com/user`, {
          headers: { Authorization: `token ${access_token}` },
        });
        // console.table(data2.data);
        console.log("로그인 성공 id : "+data2.data.login);
        res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'lax',maxAge:100000 })
        .json({ accessToken : access_token, id : data2.data.login, name : data2.data.name });
        return;
      }catch(err){
        console.log("엑세스토큰 인증요청 에러")
        console.log(err)
      }
    }else{
      console.log(restoken);
      console.log("엑세스토큰 받아오기 에러")
      res.status(500).json({success:false});
      return;
    }
  }catch(err){
    console.log(err)
  }
  res.status(500).json({success:false});
});
//----------------------------------------------------------------------깃허브 리프레시토큰 자동 로그인
// app.post("/account/github/autologin",async(req, res, next) => {
//   console.log("자동로그인 시도")
//   const { refreshToken } = req.cookies;
//   console.log(refreshToken);
//   try{
//       const restoken = await axios.post("https://github.com/login/oauth/access_token",
//       {
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: refreshToken,
//       },
//       {
//         headers: {
//           accept: "application/json",
//         },
//       }
//       )
//       if(restoken.status === 200)
//       {
//         try{
//           const access_token = restoken.data.access_token;
//           const refresh_token = restoken.data.refresh_token;
//           const data2 = await axios.get(`https://api.github.com/user`, {
//             headers: { Authorization: `token ${access_token}` },
//           });
//           console.log("깃허브 자동 로그인 성공")
//           res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' })
//           .json({ accessToken : access_token, id : data2.data.login, name : data2.data.name });
//           return;
//         }catch(err){
//           console.log(err)
//           console.log("엑세스토큰 인증요청 에러")
//           res.status(500).json({success:false});
//           return;
//         }
//       }
//   }catch(err){
//     console.log(err)
//     res.status(500).json({success:false});
//   }
//   console.log("깃허브 자동 로그인 실패")
//   res.status(500).json({success:false});
// });




app.use((req, res, next) => {
  console.log(req.ip);
  res.status(404).send("404Not Found");
});