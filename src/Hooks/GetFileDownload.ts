import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from './AxiosHeader';

const GetFileDownload = async (path: string): Promise<void> => {
try {
    const response = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/drive/download?filename=${path}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', path);
    document.body.appendChild(link);
    link.click();
  } catch (error) { 
    console.error('Download error:', error);
  }
}

export default GetFileDownload;