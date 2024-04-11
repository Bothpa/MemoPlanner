import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

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
        const response:AxiosResponse<{success: boolean, message:string}> 
        = await accessTokenAxiosConfig.put(`http://jungsonghun.iptime.org:7223/userSchedule/update`,data);
        if(response.data.success)
        {   
            return true;
        }else
        {
            alert(response.data.message);
        }
    }catch(err){
        alert(err);
        window.location.reload();
    }
}

export default UpdataeScheduleApi;