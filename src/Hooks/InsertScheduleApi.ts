import axios,{ AxiosResponse } from 'axios';

interface data {
    year:number,
    month:number,
    day:number,
    color:string,
    usertext:string,
}

const InsertScheduleApi = async(data:data) => {
    try{
        const response:AxiosResponse<{success: boolean}> 
        = await axios.post(`http://jungsonghun.iptime.org:7223/userSchedule/insert`,data);
        if(response.data.success)
        {   
            // setIsColorPalletChange(false);
            // setPopupOut();
            // setIsColorPalletChange(true);
            // userScheduleApi(nowYear,nowMonth);
            window.location.reload();
        }else
        {
            alert("일정 입력 실패");
            window.location.reload();
        }
    }catch(err){
        alert(err);
        window.location.reload();
    }
}

export default InsertScheduleApi;