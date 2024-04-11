import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

interface data {
    year:number,
    month:number,
    day:number,
    color:string,
    usertext:string,
}

const InsertScheduleApi = async(data:data) => {
    try{
        const response:AxiosResponse<{success: boolean, message:string}> 
        = await accessTokenAxiosConfig.post(`http://jungsonghun.iptime.org:7223/userSchedule/insert`,data);
        if(response.data.success)
        {   
            return true;
            // window.location.reload();
        }else
        {
            alert(response.data.message);
        }
    }catch(err){
        alert(err);
        window.location.reload();
    }
}

export default InsertScheduleApi;