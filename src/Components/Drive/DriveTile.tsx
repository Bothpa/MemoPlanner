import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";
import DriveDirectory from "./DriveDirectory";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import DriveBar from "./DriveBar";
import PostDriveFile from "../../Hooks/PostDriveFile";
import GetFileTreeApi from "../../Hooks/GetFileTree";

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
  const dragRef = useRef<HTMLDivElement | null>(null);

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

  //---------------------------------------------------------------
  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      if (
        e.dataTransfer.files.length > 1 ||
        e.dataTransfer.files.length === 0
      ) {
        alert("파일은 하나씩만 업로드 가능합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("file", e.dataTransfer.files[0]);
      formData.append("path", nowPathUrl);
      PostDriveFile(formData)
        .then(async (res) => {
          setNowPathUrl("/");
          const data = await GetFileTreeApi();
          fileTreeStore.setState({ fileTree: data });
          formData.delete("file");
          e.target.file.value = "";
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [nowPathUrl]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);
  // -------------------------------------------------

  return (
    <div
      className={`w-full h-full flex flex-col p-3 pb-2 pt-0 overflow-y-auto`}
      ref={dragRef}
    >
      <DriveBar nowPathUrl={nowPathUrl} goBack={goBack} />
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
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={false}
        onChange={onChangeFiles}
      />
    </div>
  );
};

export default DriveTile;
