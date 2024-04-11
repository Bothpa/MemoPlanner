import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

interface userSchedule {
    year : number;
    month : number;
    day : number;
    color : string;
    usertext : string;
    userId : string;
    id : number;
}

export const userScheduleApi = async(year:number, month:number) => {
    try{
        const response:AxiosResponse<{success: boolean, data:userSchedule[], message:string}> 
        = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/userSchedule/${year}/${month}`);
        if(response.data.success)
        {   
            return response.data.data;
        }else
        {
            return [];
        }
      }
      catch(err){
        console.log(err);
        return [];
      }
}
