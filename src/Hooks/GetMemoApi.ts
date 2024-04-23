import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

interface Memo {
    id : number;
    userId : string;
    content : string;
    date : string;
}

export const GetMemoApi = async(id:number) => {
    try{
        const response:AxiosResponse<{success : boolean, data:Memo, message:string}> 
        = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/memo/getmemo/${id}`);
        if(response.data.success)
        {   
            return response.data.data;
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
