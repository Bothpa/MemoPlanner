import LogOutButton from "../Account/LogOutButton";
import { accountStore } from "../../zustandStore/zustandAccount";
import GitHubLogin from "../Account/GitHubLogin";
import { motion } from "framer-motion";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface AccountPopupProps {
    isAccountPopup: boolean;
}

const AccountPopup: React.FC<AccountPopupProps> = ({isAccountPopup}) => {
    const { isLogin, id, name, profileImg } = accountStore();
    const { isDarkMode } = DarkModeStore();
    return (
        <motion.div initial={{ opacity: 0, y: -40 }} whileInView={{opacity: 1,y: 3,transition: { delay: 0.1 },}}  className={`w-[280px] h-fit flex flex-col items-center bg-white p-3 fixed right-3 rounded-xl shadow-lg ${isDarkMode? 'bg-zinc-900 text-[#ffffff99]' : 'light'} ${isAccountPopup?'block' : 'hidden'}`}>
            {isLogin ? <img src={profileImg} className='w-[100px] h-[100px] rounded-full mb-2' alt="profileImg"/> : <img src='/Icon/Profile.png' className='w-[100px] h-[100px] rounded-full mb-2' alt="profileImg"/>}
            {isLogin ? (<div className={`mb-3 flex flex-row`}><p className="font-bold">{id}</p>({name})</div>):(<div className={`mb-3 flex flex-row`}><p className="font-bold">로그인</p>하세요.</div>)}
            {isLogin ? <LogOutButton/> : <GitHubLogin/>}
        </motion.div>
    )
}

export default AccountPopup;