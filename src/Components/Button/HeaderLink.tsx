import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface HeaderLinkProps{
    label:string;
    url:string;
    img:string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({label,url,img}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = DarkModeStore();

    return(
        <motion.div whileHover={{ scale: 1.1 }} onClick={()=>navigate(`${url}`)} className={`w-full h-fit p-2 mb-2 flex flex-row items-center text-xl cursor-pointer rounded-xl ${location.pathname == url && ` ${isDarkMode ? 'bg-[#0D1922] text-[#30A9FF]' : 'bg-sky-100 text-sky-500'}`}`}>
            <img src={`/Icon/${img}.png`} alt="image" className="w-6 h-6 mr-2"/>{label}
        </motion.div>
    )
}

export default HeaderLink;