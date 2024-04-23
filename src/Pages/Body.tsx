import { Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import CalendarPage from './CalendarPage';
import MemoPage from './MemoPage';
import Account from './Account';
import CKEditorComponent from '../Components/Memo/CkEditorComponent';

const Body = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full flex justify-center ${isDarkMode ? 'dark' : 'light'}`}>
        <Routes>
        {/* 게시판 */}
        <Route path='/' element={<CalendarPage/>}/>
        <Route path='/account' element={<Account/>}/>
        {/* 메모 */}
        <Route path='/memo' element={<MemoPage/>}/>
        <Route path='/memoeditor' element={<CKEditorComponent/>}/>
        {/* 없는 url 예외처리 */}
        <Route path={"*"} element={<CalendarPage/>} />
      </Routes>
    </div>
  );
}
export default Body;
