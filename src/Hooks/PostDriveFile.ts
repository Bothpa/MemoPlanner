import { AxiosResponse } from "axios";
import accessTokenAxiosConfig from "./AxiosHeader";

const PostDriveFile = async (file: FormData) => {
  try {
    const response = await accessTokenAxiosConfig.post(
      `http://jungsonghun.iptime.org:7223/drive/upload`,
      file
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

export default PostDriveFile;
