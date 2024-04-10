import axios,{ AxiosResponse } from 'axios';

interface data {
    year:number,
    month:number,
    day:number,
    color:string,
    usertext:string,
    id:number,
}

const UpdataeScheduleApi = async(data:data) => {
    try{
        const response:AxiosResponse<{success: boolean}> 
        = await axios.put(`http://jungsonghun.iptime.org:7223/userSchedule/update`,data);
        if(response.data.success)
        {   
            // setIsColorPalletChange(false);
            // setPopupOut();
            // setIsColorPalletChange(true);
            // userScheduleApi(nowYear,nowMonth);
            window.location.reload();
        }else
        {
            alert("일정 수정 실패");
            window.location.reload();
        }
    }catch(err){
        alert(err);
        window.location.reload();
    }
}

export default UpdataeScheduleApi;