import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';


export const DeleteMemoApi = async(id:number) => {
    try{
        const response:AxiosResponse<{success : boolean, message:string}> 
        = await accessTokenAxiosConfig.delete(`http://jungsonghun.iptime.org:7223/memo/deletememo/${id}`);
        if(response.data.success)
        {   
            return true;
        }else
        {
            return false;
        }
      }
      catch(err){
        console.log(err);
        return false;
      }
}
