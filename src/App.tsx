import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { DarkModeStore } from "./zustandStore/zustandDarkMode";
import { NowDateStore } from "./zustandStore/zustandDate";
import { holidayStore } from "./zustandStore/zustandHoliday";
import { HolidayApi } from "./Hooks/HolydayApi";
import { calendarStore } from "./zustandStore/zustandCalendar";
import DateCalculation from "./Hooks/DateCalculationApi";
import { userScheduleApi } from "./Hooks/UserScheduleApi";
import { userScheduleStore } from "./zustandStore/zustandUserSchedule";
import GithubAutoLoginEvent from "./Hooks/GitHubAutoLogin";
import Body from "./Pages/Body";
import ComHeader from "./Header/ComHeader";
import PhoneHeader from "./Header/PhoneHeader";
import PopupPage from "./Components/Popup/PopupPage";
import SchedulePopup from "./Components/Popup/SchedulePopup";
import { accountStore } from "./zustandStore/zustandAccount";
import { changeStateStore } from "./zustandStore/zustandChangeState";
import LoginStatus from "./Components/Account/LoginStatus";
import fileTreeStore from "./zustandStore/zustandFileTreeStore";
import GetFileTreeApi from "./Hooks/GetFileTree";
import axios from "axios";

const App = () => {
  const isDarkMode = DarkModeStore((state) => state.isDarkMode);
  const { year, month } = NowDateStore();
  const { setHoliday } = holidayStore();
  const { setCalendar } = calendarStore();
  const { setUserSchedule } = userScheduleStore();
  const { setAccountLogin } = accountStore();
  const { change } = changeStateStore();

  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") != null &&
      sessionStorage.getItem("account") != null
    ) {
      const stringAccount = sessionStorage.getItem("account");
      const accessToken = sessionStorage.getItem("accessToken");
      if (stringAccount != null && accessToken != null) {
        try {
          const account = JSON.parse(stringAccount);
          setAccountLogin(account.id, account.name, account.profileImg);
        } catch (err) {
          sessionStorage.clear();
        }
      } else {
        sessionStorage.clear();
        return;
      }
    }
  }, []);

  // 자동로그인
  useEffect(() => {
    const GithubAutoLoginEventRes = async () => {
      const res = await GithubAutoLoginEvent();
      if (res != false && res.id != null && res.name != null) {
        console.log("여기야3??");
        setAccountLogin(res.id, res.name, res.profileImg);
        const data = await userScheduleApi(year, month);
        setUserSchedule(data);
      }
    };
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken == null) {
      GithubAutoLoginEventRes();
    }
  }, []);

  // 달력정보 store에 저장
  useEffect(() => {
    setCalendar([]);
    setHoliday([]);
    setUserSchedule([]);

    // Calendar
    const CalendarFunc = async () => {
      const data = await DateCalculation(year, month);
      setCalendar(data);
    };
    // Holiday
    const HolidayFunc = async () => {
      const data = await HolidayApi(year, month);
      setHoliday(data);
    };
    // UserSchedule
    const UserScheduleFunc = async () => {
      const data = await userScheduleApi(year, month);
      setUserSchedule(data);
    };
    if (sessionStorage.getItem("accessToken") != null) {
      UserScheduleFunc();
    }
    CalendarFunc();
    HolidayFunc();
  }, [year, month, change]);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <BrowserRouter>
        {/* 컴퓨터 */}
        <div className="Com-Header">
          <ComHeader />
        </div>
        {/* 바디 */}
        <div className="Body">
          <Body />
        </div>
        {/* 핸드폰 */}
        <div className="Phone-Header">
          <PhoneHeader />
        </div>
        {/* 팝업 */}
        <PopupPage />
        <SchedulePopup />
        {/* 로그인 상태 */}
        <LoginStatus />
      </BrowserRouter>
    </div>
  );
};

export default App;
