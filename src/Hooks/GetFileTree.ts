import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

interface fileTree {
    name : string;
    path : string;
    isDirectory : boolean;
    parentPath : string;
    children : fileTree[]|null;
}

const GetFileTreeApi = async() => {
    try{
        const response:AxiosResponse<{success: boolean, message:string, fileTree:fileTree[]}> 
        = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/drive/filetree`);
        if(response.data.success)
        {   
            return response.data.fileTree;
        }else
        {
            return [];
        }
    }catch(err){
        return [];
    }
}

export default GetFileTreeApi;