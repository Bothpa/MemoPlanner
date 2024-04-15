import LogOutButton from "../Account/LogOutButton";
import { accountStore } from "../../zustandStore/zustandAccount";
import GitHubLogin from "../Account/GitHubLogin";
import { motion } from "framer-motion";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface AccountPopupProps {
    isAccountPopup: boolean;
}

const AccountPopup: React.FC<AccountPopupProps> = ({isAccountPopup}) => {
    const { isLogin } = accountStore();
    const { isDarkMode } = DarkModeStore();
    return (
        // <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{opacity: 1,y: 3,transition: { delay: 0.1 },}}  className={`w-fit h-fit p-2 border ${isDarkMode?'border-zinc-700':'border-zinc-300'}  fixed right-1 rounded-xl ${isAccountPopup?'block' : 'hidden'}`}>
        //     {isLogin ? <LogOutButton/> : <GitHubLogin/>}
        // </motion.div>
        <motion.div initial={{ opacity: 0, y: -40 }} whileInView={{opacity: 1,y: 3,transition: { delay: 0.1 },}}  className={`w-fit h-fit p-2 fixed right-1 rounded-xl ${isAccountPopup?'block' : 'hidden'}`}>
            {isLogin ? <LogOutButton/> : <GitHubLogin/>}
        </motion.div>
    )
}

export default AccountPopup;