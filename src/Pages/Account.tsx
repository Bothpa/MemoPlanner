import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import { accountStore } from '../zustandStore/zustandAccount';
import GitHubLogin from '../Components/Account/GitHubLogin';
import LogOutButton from '../Components/Account/LogOutButton';


const Account = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const { isLogin, id, name } = accountStore();
  return (
    <div className={`w-full h-full flex justify-center ${isDarkMode ? 'dark' : 'light'}`}>
      {isLogin?<LogOutButton/>:<GitHubLogin/>}
    </div>
  );
}

export default Account;