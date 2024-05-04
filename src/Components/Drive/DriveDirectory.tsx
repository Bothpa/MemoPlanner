import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
interface DriveDirectory {
    name : string;
    path : string;
    isDirectory : boolean;
    children : fileTree[]|null;
    nowPath : fileTree[];
    setNowPath : (data: fileTree[] | null) => void;
    pathArray : fileTree[][];
    setPathArray : (data:any) => void;
}

interface fileTree {
    name : string;
    path : string;
    isDirectory : boolean;
    children : fileTree[]|null;
}

const DriveDirectory:React.FC<DriveDirectory> = ({name, path, isDirectory, children, setNowPath, pathArray, setPathArray, nowPath}) => {
    const {isDarkMode} = DarkModeStore();
    const IconName = () => {
        const SplitName = name.split('.').pop();
        if(isDirectory) return "Folder";
        if(SplitName === 'pdf') return "Pdf";
        if(SplitName === 'exe') return "Exe";
        if(SplitName === 'zip') return "Zip";
        if(SplitName === 'png' || SplitName === 'jpg' || SplitName === 'jpeg' || SplitName === 'Gif' ) return "Photo";
        return "File";
    }
    const Extension = () => {
        const SplitName = name.split('.').pop();
        if(isDirectory) return "폴더";
        return SplitName?.toUpperCase();
    }

    const ClickEvent = () => {
        if(isDirectory)
        {   
            setPathArray([...pathArray, nowPath]);
            setNowPath(children);
        }
    }

    return(
        <div className={`w-full h-[40px] pl-3 flex felx-col items-center cursor-pointer rounded-md ${isDarkMode?'hover:bg-slate-700':'hover:bg-slate-200'}`} onClick={ClickEvent}>
            <img src={`/Icon/${IconName()}.png`} alt="" className="h-[70%] mr-2"/> 
            <div className="font-bold mr-3">{name}</div>
            <div>{Extension()}</div>
        </div>
    )
}

export default DriveDirectory;