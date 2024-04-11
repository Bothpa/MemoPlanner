import { DarkModeStore } from '../../zustandStore/zustandDarkMode';
import { motion } from "framer-motion";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

const ChangeThema = () => {
    const { isDarkMode, setDarkMode, setLightMode } = DarkModeStore();

    return(
        <div className='flex flex-row items-center'>
            <p className='mr-2 text-[20px]'>DarkMode</p>
            <div className={`w-[45px] h-[25px] bg-blue-400 flex rounded-[50px] p-[2.5px] cursor-pointer ${isDarkMode ? 'justify-end' : 'justify-start'} `} onClick={()=>{if(isDarkMode){setLightMode()}else{setDarkMode()}}}>
                <motion.div className="w-[20px] h-[20px] bg-white rounded-[40px]" layout transition={spring} />
            </div>
        </div>
    )
}

export default ChangeThema;
