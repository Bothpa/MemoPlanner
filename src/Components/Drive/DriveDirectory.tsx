import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import GetFileDownload from "../../Hooks/GetFileDownload";
import { useEffect } from "react";
import DeleteDriveFile from "../../Hooks/DeleteDriveFile";
import GetFileTreeApi from "../../Hooks/GetFileTree";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";

interface DriveDirectory {
  name: string;
  path: string;
  isDirectory: boolean;
  children: fileTree[] | null;
  nowPath: fileTree[];
  parentPath: string;
  setNowPath: (data: fileTree[] | null) => void;
  pathArray: fileTree[][];
  setPathArray: (data: any) => void;
  nowPathUrl: string;
  setNowPathUrl: (data: string) => void;
}

interface fileTree {
  name: string;
  path: string;
  isDirectory: boolean;
  parentPath: string;
  children: fileTree[] | null;
}

const DriveDirectory: React.FC<DriveDirectory> = ({
  name,
  parentPath,
  path,
  isDirectory,
  children,
  setNowPathUrl,
  nowPathUrl,
  setNowPath,
  pathArray,
  setPathArray,
  nowPath,
}) => {
  const { isDarkMode } = DarkModeStore();
  const IconName = () => {
    const SplitName = name.split(".").pop();
    if (isDirectory) return "Folder";
    if (SplitName === "pdf") return "Pdf";
    if (SplitName === "exe") return "Exe";
    if (SplitName === "zip") return "Zip";
    if (
      SplitName === "png" ||
      SplitName === "jpg" ||
      SplitName === "jpeg" ||
      SplitName === "Gif"
    )
      return "Photo";
    return "File";
  };
  const Extension = () => {
    const SplitName = name.split(".").pop();
    if (isDirectory) return "폴더";
    return SplitName?.toUpperCase();
  };

  const DoubleClickEvent = async () => {
    if (isDirectory) {
      setPathArray([...pathArray, nowPath]);
      setNowPath(children);
      if (nowPathUrl == "/") {
        setNowPathUrl(nowPathUrl + name);
      } else {
        setNowPathUrl(nowPathUrl + "/" + name);
      }
    } else {
      await GetFileDownload(path);
    }
    console.log("DoubleClickEvent");
  };

  const fileDeleteEvent = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await DeleteDriveFile(path)
        .then(async (res) => {
          if(res === false) alert("폴더안에 파일을 모두 삭제 후 시도해 주세요.");
          const data = await GetFileTreeApi();
          fileTreeStore.setState({ fileTree: data });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div
      className={`w-full h-[40px] pl-3 flex felx-col items-center cursor-pointer rounded-md ${
        isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"
      }`}
      // onClick={OneClickEvent}
      onDoubleClick={DoubleClickEvent}
    >
      <img src={`/Icon/${IconName()}.png`} alt="" className="h-[70%] mr-2" />
      <div className="font-bold mr-3">{name}</div>
      <div>{Extension()}</div>
      <button
        onClick={fileDeleteEvent}
        className="ml-auto mr-10 border p-1 rounded-xl hover:bg-red-500 hover:text-white"
      >
        삭제
      </button>
    </div>
  );
};

export default DriveDirectory;
