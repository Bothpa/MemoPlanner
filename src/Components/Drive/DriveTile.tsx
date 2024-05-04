import { useEffect, useState } from "react";
import { fileTreeStore } from "../../zustandStore/zustandFileTreeStore"
import DriveDirectory from "./DriveDirectory";

interface fileTree {
    name : string;
    path : string;
    isDirectory : boolean;
    children : fileTree[]|null;
}

const DriveTile = () => {
    const { fileTree } = fileTreeStore();
    const [nowPath , setNowPath] = useState<fileTree[]|null>();
    const [pathArray, setPathArray] = useState<fileTree[][]>([]);

    useEffect(() => {
        setNowPath(fileTree);
        console.log(fileTree);
    }, [fileTree])

    const goBack = () => {
        if(pathArray.length === 0) return;
        setNowPath(pathArray[pathArray.length-1]);
        setPathArray(pathArray.slice(0, -1));
    }

    return(
        <div className="w-full h-full p-3 overflow-y-auto">
            <button onClick={goBack}>뒤로가기</button>
            {nowPath?.length ? (
                nowPath.map((item: fileTree, index) => (
                    <DriveDirectory key={index}
                    name={item.name} path={item.path} isDirectory={item.isDirectory} children={item.children}
                    setNowPath={setNowPath} pathArray={pathArray} setPathArray={setPathArray} nowPath={nowPath}
                    />
                ))
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <img src="/Icon/Empty.png" alt="empty" className="w-[100px] mb-3"/>
                    <div className="text-lg font-bold">폴더가 비어있습니다.</div>
                </div>
            )}
        </div>
    )
}

export default DriveTile
