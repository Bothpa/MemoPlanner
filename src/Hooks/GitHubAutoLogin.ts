import axios from 'axios';

const GithubAutoLoginEvent = async() => {
    try{
        const res = await axios.get("http://jungsonghun.iptime.org:7223/account/github/autologin",{ withCredentials : true })
        if(res){
            if(res.status === 200)
            {
                console.log("여기야1??");
                sessionStorage.setItem("accessToken",res.data.accessToken);
                sessionStorage.setItem("account",`{"id":"${res.data.id}", "name":"${res.data.name}", "profileImg":"${res.data.profileImg}"}`)
                return {id:res.data.id, name: res.data.name, profileImg: res.data.profileImg}
            }else{
                return false;
            }
        }
        return false;
    }catch(err){
        return false;
    }
}

export default GithubAutoLoginEvent;

// import axios from 'axios';

// const GithubAutoLoginEvent = async() => {
//     try{
//         await axios.get("http://jungsonghun.iptime.org:7223/account/github/autologin",{ withCredentials : true })
//         .then((res)=>{
//             sessionStorage.setItem("accessToken",res.data.accessToken);
//             sessionStorage.setItem("account",`{"id":"${res.data.id}", "name":"${res.data.name}", "profileImg":"${res.data.profileImg}"}`)
//             return {id:res.data.id, name: res.data.name, profileImg: res.data.profileImg}
//         })
//         .catch((err)=>{
//             sessionStorage.clear();
//             return false;
//         })
//         return false;
//     }catch(err){
//         return false;
//     }
// }

// export default GithubAutoLoginEvent;