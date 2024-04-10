import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../../zustandStore/zustandDarkMode';
import { HolidayApi } from '../../Hooks/HolydayApi';
import { isPopupStore } from '../../zustandStore/zustandIsPopup';
import { getDayOfWeek } from '../../Hooks/DayOfWeek';
import UserScheduleBlock from '../Calendar/UserScheduleBlock';
import { schedulePopupStore } from '../../zustandStore/zustandSchedulePopup';
import { motion } from 'framer-motion';

interface PopInUserScheduleBlcokProps{
  userScheduleitem : {
    year: number;
    month: number;
    day: number;
    id: number;
    color: string;
    usertext: string;
  }
}

const PopInUserScheduleBlcok: React.FC<PopInUserScheduleBlcokProps> = ({userScheduleitem}) => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const { setSchedulePopupIn } = schedulePopupStore();

  return(
    <div onClick={()=>setSchedulePopupIn(userScheduleitem)} className={`w-full h-fit max-[800px]:h-[12%] p-2 mb-2 rounded-[15px] flex items-center cursor-pointer ${isDarkMode?"bg-zinc-800 hover:bg-zinc-700 text-white":"hover:bg-zinc-100"}`}>
      <div className={`w-[17px] h-[17px] ${userScheduleitem.color} rounded-[5px] mr-2`}></div>
      <div className='w-[90%] h-fit text-lg'>{userScheduleitem.usertext}</div>
    </div>
)};

const PopupPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const { isPopup,  year, month, day, userSchedule, setPopupOut} = isPopupStore();
  const weekDay = getDayOfWeek(year,month,day);
  const { setSchedulePopupPlus } = schedulePopupStore();

  const handleChildClick = (e:any) => {
    e.stopPropagation();
  };

  const postEvent = () => {
    setSchedulePopupPlus(year, month, day);
  }

  return (
    <div className={`${isPopup? 'block' : 'hidden'} w-screen h-screen fixed top-0 bottom-0 bg-[#00000040] z-10 backdrop-blur`} onClick={setPopupOut}>

      <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1,transition: { delay: 0.1 },}}
      className='w-[30%] h-[10%] top-[14%] left-[35%] max-[800px]:w-[90%] max-[800px]:left-[5%] absolute z-30 p-3 text-2xl font-medium text-slate-200'>
        {month}월 {day}일 {weekDay}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1,transition: { delay: 0.1 },}}
      className={`w-[30%] h-[60%] top-[25%] left-[35%] max-[800px]:w-[90%] max-[800px]:h-1/2 max-[800px]:left-[5%] absolute rounded-[30px] z-20 p-3 overflow-y-auto overflow-x-hidden ${isDarkMode?"bg-zinc-900":"bg-white"}`} onClick={handleChildClick}>
        {userSchedule && userSchedule.map((userScheduleitem, userScheduleindex) => (
          <PopInUserScheduleBlcok userScheduleitem={userScheduleitem} key={userScheduleindex}/>
        ))}

        <div onClick={postEvent} className='fixed bottom-[16%] right-[35.5%] max-[800px]:bottom-[26%] max-[800px]:right-[7.5%] w-12 h-12 cursor-pointer '>
          <img src="/Icon/Post.png" className="w-full h-full" alt='PostImage'/>
        </div>
      </motion.div>

    </div>
  );
}

export default PopupPage;