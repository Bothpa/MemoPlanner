import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import DriveTree from '../Components/Drive/DriveTree';
import DriveTile from '../Components/Drive/DriveTile';
import { useEffect } from 'react';
import GetFileTreeApi from '../Hooks/GetFileTree';
import { fileTreeStore } from '../zustandStore/zustandFileTreeStore';

const DrivePage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const { setFileTree } = fileTreeStore();
  
    // FileTree
    useEffect(()=>{
      const FileTreeFunc = async() => {
        const data = await GetFileTreeApi();
        setFileTree(data);
      }
      if(sessionStorage.getItem('accessToken') != null )
      {
        FileTreeFunc();
      }
    },[])

  return (
    <div className={`w-full h-full flex flex-row ${isDarkMode ? 'dark' : 'light'}`}>
      {/* <div className='w-[20%] h-full'><DriveTree /></div> */}
      <DriveTile />
    </div>
  );
}

export default DrivePage;
