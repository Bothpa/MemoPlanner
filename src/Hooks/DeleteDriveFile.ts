import { AxiosResponse } from "axios";
import accessTokenAxiosConfig from "./AxiosHeader";

const DeleteDriveFile = async (file: string) => {
  try {
    const response = await accessTokenAxiosConfig.delete(
      `http://jungsonghun.iptime.org:7223/drive/delete`,
      { data: { file } }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("delete error:", error);
    return false;
  }
};

export default DeleteDriveFile;
