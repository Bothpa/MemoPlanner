import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import CKEditorComponent from '../Components/Memo/CkEditorComponent';
import MemoSelect from '../Components/Memo/MemoSelect';

const MemoPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full flex flex-row ${isDarkMode ? 'dark' : 'light'}`}>
        <MemoSelect/>
        <CKEditorComponent/>
    </div>
  );
}

export default MemoPage;