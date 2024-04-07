import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../../zustandDarkMode';
import { HolidayApi } from '../../Hooks/HolydayApi';
import { isPopupStore } from '../../zustandIsPopup';

const PopupPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const isPopup = isPopupStore(state => state.isPopup);
  const setPopupOut = isPopupStore(state => state.setPopupOut)

  const handleChildClick = (e:any) => {
    e.stopPropagation(); // 이벤트 버블링 중지
  };

  return (
    <div className={`${isPopup? 'block' : 'hidden'} w-screen h-screen fixed top-0 bottom-0 bg-[#00000040] z-10`} onClick={setPopupOut}>
      <div className={`w-[30%] h-[60%] top-[20%] left-[35%] max-[800px]:w-[90%] max-[800px]:h-1/2 max-[800px]:left-[5%] absolute rounded-[30px] bg-white z-20`} onClick={handleChildClick}>
        
      </div>
    </div>
  );
}

export default PopupPage;