import { useNavigate } from 'react-router-dom';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import ChangeThema from '../Components/Button/ChangeThema';
import HeaderLink from '../Components/Button/HeaderLink';
import { accountStore } from '../zustandStore/zustandAccount';

const Logo = () => {
  const navigate = useNavigate();
  const { isLogin, id, name } = accountStore();
  return (<div onClick={()=>navigate('/')} className='w-full h-fit text-[27px] flex justify-center cursor-pointer'>
            {/* {isLogin? `${id}님 환영합니다`:'로그인하셈.'} */}
            MemoPlanner
          </div>
  );
};

const ComHeader = () => {
  const { isDarkMode } = DarkModeStore();
  const { isLogin } = accountStore();

  return (
    <div className={`${isDarkMode ? 'dark border-r-[1px] border-zinc-800' : 'light border-r-2'} w-full h-full relative`}>
      
      {/* 로고박스 */}
      <div className={`w-full p-2 ${isDarkMode ? 'dark border-b-[1px] border-zinc-800' : 'light border-b-2'}`}>
        <Logo/>
      </div>

      {/* 링크박스 */}
      <div className='w-full p-3 flex flex-col justify-center items-center'>
          <HeaderLink label='Calendar' url='/' img='Calendar'/>
          <HeaderLink label='Memo' url='/memo' img='Memo'/>
          <HeaderLink label='Drive' url='/drive' img='Drive'/>
      </div>  

      {/* 설정박스 */}
      <div className={`w-full flex justify-center absolute bottom-0 left-0 p-2 ${isDarkMode ? 'dark border-t-[1px] border-zinc-800' : 'light border-t-2'}`}>
        <ChangeThema/>
      </div>

    </div>
  );
}

export default ComHeader;
