import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import { useNavigate } from 'react-router-dom';


const PhoneHeader = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const navigate = useNavigate();

  return (
    <div className={`${isDarkMode ? 'dark border-t-[1px] border-gray-700' : 'light border-t-2'} w-full h-full`}>
        <button onClick={()=>navigate('/')}>홈으로가기</button>
        <button onClick={()=>navigate('/memo')}>메모로가기</button>
        <button onClick={()=>navigate('/drive')}>클라우드로가기</button>
    </div>
  );
}

export default PhoneHeader;
