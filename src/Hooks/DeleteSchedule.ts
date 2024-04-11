import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

const DeleteScheduleApi = async(id:number) => {
    try{
        const response:AxiosResponse<{success: boolean, message:string}> 
        = await accessTokenAxiosConfig.delete(`http://jungsonghun.iptime.org:7223/userSchedule/delete/${id}`);
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

export default DeleteScheduleApi;