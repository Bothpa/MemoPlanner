import axios from 'axios';

const GithubAutoLoginEvent = async() => {
    try{
        const res = await axios.post("http://jungsonghun.iptime.org:7223/account/github/autologin",{ withCredentials : true })
        if(res){
            sessionStorage.setItem("accessToken",res.data.accessToken);
            sessionStorage.setItem("account",`{"id":"${res.data.id}", "name":"${res.data.name}"}`)
            return {id:res.data.id, name: res.data.name}
        }
        return false;
    }catch(err){
        return false;
    }
}

export default GithubAutoLoginEvent;