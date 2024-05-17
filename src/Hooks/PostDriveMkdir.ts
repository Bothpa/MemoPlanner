import { AxiosResponse } from "axios";
import accessTokenAxiosConfig from "./AxiosHeader";

const PostDriveMkdir = async (folderName: string, nowPathUrl: string) => {
  try {
    const response = await accessTokenAxiosConfig.post(
      `http://jungsonghun.iptime.org:7223/drive/createfolder`,
      { folderName: folderName, nowPathUrl: nowPathUrl }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("upload error:", error);
    return false;
  }
};

export default PostDriveMkdir;
