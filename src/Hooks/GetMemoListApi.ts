import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

interface Memolist {
    id : number;
    userId : string;
    content : string;
    date : string;
}

export const GetMemolistApi = async() => {
    try{
        const response:AxiosResponse<{success : boolean, data:Memolist[], message:string}> 
        = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/memo/getlist`);
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
