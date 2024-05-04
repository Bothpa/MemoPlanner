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
const fs = require('fs');
//----------------------------------------------------------------------나의 코드 모듈
const sql = require('./Hooks/mysql.js'); // sql 모듈을 가져옴
const GitHubApi = require('./Hooks/GitHubApi.js');
const multer = require('multer');
//----------------------------------------------------------------------모든 요청에대해 정지된아이피 감지
app.use(cors({
  origin: ['http://jungsonghun.iptime.org:3000','http://jungsonghun.iptime.org:8864'],  // 클라이언트의 URL
  credentials: true  // 쿠키를 허용하도록 설정
}));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../memoplanner/build')));
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
  // const { year, month } = req.params;
  // const accessToken = req.headers.authorization;
  // const userid = await GitHubApi.GitHubApi(accessToken)
  // if(!userid)
  //   {
  //     res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
  //     return;
  //   }
  // console.log("id : "+userid+"가 "+year+"년"+month+"월 일정을 요청"+ "ip : " + req.ip);
  // sql.GetSchedule(year, month, userid, (result, values) => {
  //   if(result) 
  //   {
  //     if(values){
  //       // 검색 성공 결과 나옴
  //       // console.table(values)
  //       res.status(200).json({success: true, data:values});
  //     }else{
  //       // 검색결과 없음
  //       res.status(200).json({success:false, data:null,message: "검색 결과 없음"});
  //     }
  //   } else 
  //   {
  //     //데이터 베이스 접속 실패
  //     res.status(401).json({ success: false, message: "조회 실패" });
  //   }
  // });
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
app.get("/account/github/login/:code",async(req, res, next) => {
  console.log("깃허브 로그인?")
  const {code} = req.params;
  try{
      const restoken = await axios.post("https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
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
        console.table(data2.data);
        console.log("로그인 성공 id : "+data2.data.login);
        const options = {
          httpOnly: false,
          // sameSite: 'none',
          secure: false,
          maxAge: 60 * 24 * 60 * 60 * 1000,
        };
        res.status(200).cookie('refreshToken', refreshToken, options)
        .json({ success:true, accessToken : access_token, id : data2.data.login, name : data2.data.name, profileImg : data2.data.avatar_url });
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
app.get("/account/github/autologin",async(req, res, next) => {
  console.log("자동로그인 시도")
  const { refreshToken } = req.cookies;
  if(!refreshToken)
  {
    res.status(400).json({success:false});
    return;
  }
  try{
      const restoken = await axios.post("https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
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
          const access_token = restoken.data.access_token;
          const refresh_token = restoken.data.refresh_token;
          const data2 = await axios.get(`https://api.github.com/user`, {
            headers: { Authorization: `token ${access_token}` },
          });
          console.log("깃허브 자동 로그인 성공")
          const options = {
            httpOnly: false,
            // sameSite: 'none',
            secure: false,
            maxAge: 60 * 24 * 60 * 60 * 1000,
          };
          res.status(200).cookie('refreshToken', refresh_token, options)
          .json({ success:true, accessToken : access_token, id : data2.data.login, name : data2.data.name, profileImg : data2.data.avatar_url });
          return;
        }catch(err){
          console.log(err)
          console.log("엑세스토큰 인증요청 에러")
          res.status(500).json({success:false});
          return;
        }
      }
  }catch(err){
    console.log(err)
    res.status(500).json({success:false});
  }
  console.log("깃허브 자동 로그인 실패")
  res.status(500).json({success:false});
});
//----------------------------------------------------------------------메모 만들기
app.post('/memo/insertmemo',async(req, res, next) => {
  const accessToken = req.headers.authorization;
  if(!accessToken)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
 
  const userid = await GitHubApi.GitHubApi(accessToken)

  if(!userid)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
  
  sql.InsertMemo(userid, (result, values) => {
    if(result) 
    {
      console.log(userid + "의 메모 만들기 요청 성공")
      res.status(200).json({success: true});
    } else 
    {
      console.log(userid + "의 메모 만들기 요청 실패")
      res.status(401).json({ success: false, message: "서버 에러" });
    }
  });

});
//----------------------------------------------------------------------ckeditor 이미지 업로드
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/jungsonghun/image_server');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'si'+path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/memo/imgupload',upload.single('file'),async(req, res, next) => {
  console.log("이미지 업로드 요청");
  res.status(200).json({success:true, url:`http://jungsonghun.iptime.org:7749/images/${req.file.filename}`});
});

//----------------------------------------------------------------------메모리스트 불러오기
app.get('/memo/getlist',async(req, res, next) => {
  const accessToken = req.headers.authorization;
  if(!accessToken)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }

  const userid = await GitHubApi.GitHubApi(accessToken)

  if(!userid)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }

  sql.GetMemoList(userid, (result, values) => {
    if(result) 
    {
      console.log(userid + "의 메모 리스트 get 요청 성공")
      res.status(200).json({success: true, data:values});
    } else 
    {
      console.log(userid + "의 메모 리스트 get 실패 ")
      res.status(401).json({ success: false, message: "서버 에러, 메모가 존재하지 않습니다." });
    }
  });

});

//----------------------------------------------------------------------메모하나 불러오기
app.get('/memo/getmemo/:id',async(req, res, next) => {
  const { id } = req.params;
  const accessToken = req.headers.authorization;
  if(!accessToken)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
 
  const userid = await GitHubApi.GitHubApi(accessToken)

  if(!userid)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
  
  sql.GetMemo(userid, id, (result, values) => {
    if(result) 
    {
      console.log(userid + "의 id : "+ id +" 메모 get 요청 성공")
      res.status(200).json({success: true, data:values[0]});
    } else 
    {
      console.log(userid + "의 id : "+ id +" 메모 get 요청 실패")
      res.status(401).json({ success: false, message: "서버 에러" });
    }
  });

});

//----------------------------------------------------------------------메모수정
app.put('/memo/putmemo',async(req, res, next) => {
  const { id, content } = req.body;
  const accessToken = req.headers.authorization;
  if(!accessToken)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
 
  const userid = await GitHubApi.GitHubApi(accessToken)

  if(!userid)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
  
  sql.PutMemo(id, content ,userid, (result, values) => {
    if(result) 
    {
      console.log(userid + "의 id : "+ id +" 메모 수정 요청 성공")
      res.status(200).json({success: true});
    } else 
    {
      console.log(userid + "의 id : "+ id +" 메모 수정 요청 실패")
      res.status(401).json({ success: false, message: "서버 에러" });
    }
  });

});

//----------------------------------------------------------------------메모삭제
app.delete('/memo/deletememo/:id',async(req, res, next) => {
  console.log("메모삭제요청")
  const { id } = req.params;
  const accessToken = req.headers.authorization;
  if(!accessToken)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
 
  const userid = await GitHubApi.GitHubApi(accessToken)

  if(!userid)
  {
    res.status(200).json({success:false,message:"로그인 후 이용해주세요."});
    return;
  }
  
  sql.DeleteMemo(id, userid, (result, values) => {
    if(result) 
    {
      console.log(userid + "의 id : "+ id +" 메모 삭제 요청 성공")
      res.status(200).json({success: true});
    } else 
    {
      console.log(userid + "의 id : "+ id +" 메모 삭제 요청 실패")
      res.status(401).json({ success: false, message: "서버 에러" });
    }
  });

});

//----------------------------------------------------------------------drive 파일트리 반환
const getDirectoryContents = require('./Hooks/GetFileTree.js');
app.get('/drive/filetree', async (req, res, next) => {
  console.log("파일트리 요청")
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const userid = await GitHubApi.GitHubApi(accessToken);
  if (!userid) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const userFolder = process.env.DRIVE_PATH+userid;
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder);
  }

  const directoryContents = getDirectoryContents(userFolder,userid);
  res.status(200).json({ success: true, fileTree: directoryContents });
});

//----------------------------------------------------------------------drive 파일 업로드
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DRIVE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    // fileSize: 100 * 1024 * 1024 // 100MB
    // fileSize: 50 * 1024 * 1024 // 50MB
    fileSize: 10 * 1024 * 1024 // 10MB
    // fileSize: 1024 * 1024 // 1MB
  }
});

app.post('/drive/upload', fileUpload.single('file'), async (req, res, next) => {
  console.log("파일 업로드 요청")
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const userid = await GitHubApi.GitHubApi(accessToken);
  if (!userid) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const file = req.file;
  const userFolder = process.env.DRIVE_PATH+userid;
  const filePath = `${userFolder}/${file.filename}`;

  // Create user folder if it doesn't exist
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder);
  }

  // Move the uploaded file to the user folder
  fs.renameSync(file.path, filePath);

  res.status(200).json({ success: true, message: '파일 업로드 성공' });
}, (error, req, res, next) => {
  // console.log(error);
  return res.status(400).json({ success: false, message: "10MB 이상의 파일을 업로드 할 수 없습니다." });
});

//----------------------------------------------------------------------drive 폴더 or 파일 이름 변경
app.put('/drive/rename', async (req, res, next) => {
  console.log("폴더 이름 변경 요청")
  const { oldName, newName } = req.body;
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const userid = await GitHubApi.GitHubApi(accessToken);
  if (!userid) {
    res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    return;
  }

  const userFolder = process.env.DRIVE_PATH+userid;
  const oldPath = `${userFolder}/${oldName}`;
  const newPath = `${userFolder}/${newName}`;
  console.log(oldPath);
  console.log(newPath);

  if (!fs.existsSync(oldPath)) {
    res.status(400).json({ success: false, message: "폴더가 존재하지 않습니다." });
    return;
  }

  fs.renameSync(oldPath, newPath);

  res.status(200).json({ success: true, message: '폴더 이름 변경 성공' });
});

//----------------------------------------------------------------------테스트
app.get('/test',(req, res, next) => {
  console.log("testing~~");
  // const accessToken = req.headers.authorization? req.headers.authorization : null;
  // console.log(accessToken)

  console.log(req.cookies.refreshToken)
  const options = {
    httpOnly: false,
    // sameSite: 'none',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  // res.status(200).json({success:true});
  res.status(200).cookie('refreshToken', "Devlogtesting", options).json({success:true})
});

//----------------------------------------------------------------------예외처리
app.use((req, res, next) => {
  console.log(req.ip);
  res.status(404).send("404Not Found");
});

