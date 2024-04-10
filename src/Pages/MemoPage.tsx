import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';

import { HolidayApi } from '../Hooks/HolydayApi';

const MemoPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full flex justify-center ${isDarkMode ? 'dark' : 'light'}`}>
      메모 페이지 입니다
    </div>
  );
}

export default MemoPage;