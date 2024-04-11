import React, { ReactNode } from 'react';
import { isPopupStore } from '../../zustandStore/zustandIsPopup';
import { holidayStore } from '../../zustandStore/zustandHoliday';
import { calendarStore } from '../../zustandStore/zustandCalendar';
import { userScheduleStore } from '../../zustandStore/zustandUserSchedule';
import UserScheduleBlock from './UserScheduleBlock';
 
interface CalHeaderProps {
    day:string;
}
interface CalDivProps {
  children: ReactNode;
}
interface CalData {
    day: number | null;
    month: number | null;
    weekDay: string | null;
    year: number | null;
}
interface CalHolidayBlockProps {
  color : string | null;
  userText : string | null;
}
interface holiday {
  year : number;
  month : number;
  day : number;
  text : string;
}
interface userSchedule{
  year : number;
  month : number;
  day : number;
  color : string;
  usertext : string;
}
interface userSchedule{
  year:number;
  month:number;
  day:number;
  id:number;
  color:string;
  usertext:string;
}

const CalHeaderDiv: React.FC<CalDivProps> = ({ children }) => {
  return <div className="w-full h-[4%] flex flex-row">{children}</div>;
};

const CalHeader: React.FC<CalHeaderProps> = ({ day }) => {
  return <div className="w-full h-full text-center p-[1px] pb-[7px] text-[100%] font-bold">{day}</div>
};

const CalDataDiv: React.FC<CalDivProps> = ({ children }) => {
  return <div className="w-full h-[96%] flex flex-wrap">{children}</div>;
};

const CalHolidayBlock: React.FC<CalHolidayBlockProps> = ({color, userText}) => {
  return <div className={`w-[100%] h-fit text-white text-[13px] rounded mb-[3px] no-wrap max-[800px]:text-[11px] ${color}`}>{userText}</div>
};


const CalDiv = () => {
  const setPopupIn = isPopupStore(state => state.setPopupIn);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const CalData:CalData[]|null = calendarStore(state => state.calendar);
  const CDL = CalData?CalData.length:0;
  const holiday: holiday[] | null = holidayStore(state => state.holiday);
  const userSchedule : userSchedule[] | null = userScheduleStore(state => state.userSchedule);

  const PE = (year: number | null, month: number | null, day: number | null) => {
    if (day != null && year != null && month != null) {
        const filteredData: userSchedule[] | null = userSchedule ? userSchedule.filter(item => item.day === day && item.month === month && item.year === year) : null;
        if (filteredData !== null) {
            setPopupIn(year, month, day, filteredData);
        }
    }
}

  return (
    <>
    {CalData && CalData.map((item, index) => (
        <div key={index}  onClick={()=>PE(item.year, item.month, item.day)} className={`flex items-center flex-col w-[14.28%] ${CDL <= 35 ?' h-[20%]':' h-[16.5%]'} text-center myBorder p-[1px] text-[100%] overflow-y-auto overflow-x-hidden ${item.weekDay === 'Sun' ? 'text-red-600' : ''} ${item.weekDay === 'Sat' ? 'text-blue-600' : ''}`}>

          <div className={`${item.year===year && item.month===month && item.day===day ? 'flex justify-center items-center bg-blue-400 w-5 h-5 rounded-xl text-white mt-[2px] mb-[2px]' : ''}`}>
            {item.day}
          </div>     

          {holiday && holiday.map((holidayitem, holidayindex) => (
              (holidayitem.day === item.day ? <CalHolidayBlock color={"red"} userText={holidayitem.text} key={holidayindex}/> : null)
          ))}

          {userSchedule && userSchedule.map((userScheduleitem, userScheduleindex) => (
            (userScheduleitem.day === item.day ? <UserScheduleBlock color={userScheduleitem.color} userText={userScheduleitem.usertext} key={userScheduleindex}/> : null)
          ))}

        </div>
    ))}
    </>
  );
};

const Calendar = () => {

  return (
    <div className="w-full h-full">
  
      <CalHeaderDiv>
        <CalHeader day={"일"}/>
        <CalHeader day={"월"}/>
        <CalHeader day={"화"}/>
        <CalHeader day={"수"}/>
        <CalHeader day={"목"}/>
        <CalHeader day={"금"}/>
        <CalHeader day={"토"}/>
      </CalHeaderDiv>
    
      <CalDataDiv>
        <CalDiv/>
      </CalDataDiv>
      
    </div>
  );
}

export default Calendar;
