import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

export const InsertMemoApi = async() => {
    try{
        const response:AxiosResponse<{success : boolean, message:string}> 
        = await accessTokenAxiosConfig.post(`http://jungsonghun.iptime.org:7223/memo/insertmemo`);
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