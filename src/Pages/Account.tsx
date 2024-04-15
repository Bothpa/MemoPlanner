import { accountStore } from '../zustandStore/zustandAccount';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userScheduleApi } from '../Hooks/UserScheduleApi';
import { NowDateStore } from '../zustandStore/zustandDate';
import { userScheduleStore } from '../zustandStore/zustandUserSchedule';

const Account = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const navigate = useNavigate();
  const { setAccountLogin } = accountStore();
  const { year, month } = NowDateStore();
  const { setUserSchedule } = userScheduleStore();

  // 깃허브 로그인용
  useEffect(()=>{
    const GithubLoginEvent = async() => {
        await axios.post("http://jungsonghun.iptime.org:7223/account/github/login",{code})
        .then(async(res)=>{
            navigate('/');
            sessionStorage.setItem("accessToken",res.data.accessToken);
            sessionStorage.setItem("account",`{"id":"${res.data.id}", "name":"${res.data.name}", profileImg:"${res.data.profileImg}"`)
            setAccountLogin(res.data.id, res.data.name, res.data.profileImg);
            const data = await userScheduleApi(year,month);
            setUserSchedule(data);
        })
        .catch((err)=>{alert("GitHub Login Error")})
    }
    if(code != null){
      GithubLoginEvent();
    }
  },[])

  return (
    <>
    </>
  );
}

export default Account;