import { useEffect, useState } from "react";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";
import DriveDirectory from "./DriveDirectory";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import DriveBar from "./DriveBar";

interface fileTree {
  name: string;
  path: string;
  isDirectory: boolean;
  parentPath: string;
  children: fileTree[] | null;
}

const DriveTile = () => {
  const { isDarkMode } = DarkModeStore();
  const { fileTree } = fileTreeStore();
  const [nowPath, setNowPath] = useState<fileTree[] | null>(null);
  const [nowPathUrl, setNowPathUrl] = useState<string>("/");
  const [pathArray, setPathArray] = useState<fileTree[][]>([]);

  useEffect(() => {
    setNowPath(fileTree);
  }, [fileTree]);

  const goBack = () => {
    if (pathArray.length === 0) return;
    setNowPath(pathArray[pathArray.length - 1]);
    setPathArray(pathArray.slice(0, -1));
    setNowPathUrl((nowPathUrl) => {
      let updatedUrl = nowPathUrl;
      for (let i = nowPathUrl.length - 1; i >= 0; i--) {
        if (nowPathUrl[i] === "/") {
          updatedUrl = nowPathUrl.slice(0, i);
          if (updatedUrl === "") updatedUrl = "/";
          break;
        }
      }
      return updatedUrl;
    });
  };

  return (
    <div className="w-full h-full flex flex-col p-3 pb-2 pt-0 overflow-y-auto">
      <DriveBar nowPathUrl={nowPathUrl} />
      <div className="w-full p-2">
        <button onClick={goBack}>뒤로가기</button>
      </div>
      {nowPath?.length ? (
        nowPath.map((item: fileTree, index) => (
          <DriveDirectory
            key={index}
            name={item.name}
            path={item.path}
            isDirectory={item.isDirectory}
            children={item.children}
            setNowPath={setNowPath}
            pathArray={pathArray}
            setPathArray={setPathArray}
            nowPath={nowPath}
            nowPathUrl={nowPathUrl}
            setNowPathUrl={setNowPathUrl}
            parentPath={item.parentPath}
          />
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src="/Icon/Empty.png" alt="empty" className="w-[100px] mb-3" />
          <div className="text-lg font-bold">폴더가 비어있습니다.</div>
        </div>
      )}
      <div
        className={`w-full p-1 mt-auto text-lg ${
          isDarkMode
            ? "dark border-t-[1px] border-zinc-800"
            : "light border-t-2"
        }`}
      >
        Now : {nowPathUrl}
      </div>
    </div>
  );
};

export default DriveTile;
