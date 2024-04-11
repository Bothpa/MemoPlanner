import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { accountStore } from '../../zustandStore/zustandAccount';
import { userScheduleApi } from '../../Hooks/UserScheduleApi';
import { NowDateStore } from '../../zustandStore/zustandDate';
import { userScheduleStore } from '../../zustandStore/zustandUserSchedule';

const GitHubLogin = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const { setAccountLogin } = accountStore();
    const navigate = useNavigate();
    const { year, month } = NowDateStore();
    const { setUserSchedule } = userScheduleStore();

  const githubLogin = async() => {
    window.location.href=`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  }

  useEffect(()=>{
    const gl = async() => {
        await axios.post("http://jungsonghun.iptime.org:7223/account/github/login",{code})
        .then(async(res)=>{
            sessionStorage.setItem("accessToken",res.data.accessToken);
            sessionStorage.setItem("account",`{"id":"${res.data.id}", "name":"${res.data.name}"}`)
            setAccountLogin(res.data.id, res.data.name);
            const data = await userScheduleApi(year,month);
            setUserSchedule(data);
            navigate('/');
        })
        .catch((err)=>{alert("GitHub Login Error")})
    }
    if(code != null){
        console.log("로그인요청")
        gl();
    }
  },[])

  return <button onClick={githubLogin} className="w-fit h-fit">깃허브 로그인</button>;
}

export default GitHubLogin;