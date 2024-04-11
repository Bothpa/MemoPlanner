import { DarkModeStore } from '../zustandStore/zustandDarkMode';

const MemoPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full flex justify-center ${isDarkMode ? 'dark' : 'light'}`}>
      메모 페이지 입니다
    </div>
  );
}

export default MemoPage;