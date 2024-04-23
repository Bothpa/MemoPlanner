import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

export const PutMemoApi = async(id:number ,content:string) => {
    try{
        const response:AxiosResponse<{success : boolean, message:string}> 
        = await accessTokenAxiosConfig.put(`http://jungsonghun.iptime.org:7223/memo/putmemo`,{id:id, content:content});
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