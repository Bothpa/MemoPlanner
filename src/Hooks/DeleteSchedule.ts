import axios,{ AxiosResponse } from 'axios';

const DeleteScheduleApi = async(id:number) => {
    try{
        const response:AxiosResponse<{success: boolean}> 
        = await axios.delete(`http://jungsonghun.iptime.org:7223/userSchedule/delete/${id}`);
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

export default DeleteScheduleApi;