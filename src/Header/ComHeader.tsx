import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

const ComHeader = () => {
  const { isDarkMode, setDarkMode, setLightMode } = DarkModeStore();

  return (
    <div className={`${isDarkMode ? 'dark border-r-[1px] border-gray-700' : 'light border-r-2'} w-full h-full`}>


        라이트모드<div 
          className={`
          w-[45px] h-[25px] bg-slate-500 flex rounded-[50px] p-[2.5px] cursor-pointer 
          ${isDarkMode ? 'justify-end' : 'justify-start'} `} 
          onClick={()=>{if(isDarkMode){setLightMode()}else{setDarkMode()}}}
          >
          <motion.div className="w-[20px] h-[20px] bg-white rounded-[40px]" layout transition={spring} />
        </div>다크모드


    </div>
  );
}

export default ComHeader;
