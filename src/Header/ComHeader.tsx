import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../zustandDarkMode';



const ComHeader = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full  ${isDarkMode ? 'dark' : 'light'}`}>
        컴퓨터 전용 헤더입니다
    </div>
  );
}

export default ComHeader;
