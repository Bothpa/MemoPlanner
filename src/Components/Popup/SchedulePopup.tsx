import { useEffect, useState  } from 'react';
import { schedulePopupStore } from "../../zustandStore/zustandSchedulePopup"
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import { motion } from "framer-motion";
import ColorPallet from '../../Hooks/ColorPallet';
import { isColorPalletStore } from '../../zustandStore/zustandIsColorPallet';
import InsertScheduleApi from '../../Hooks/InsertScheduleApi';
import UpdataeScheduleApi from '../../Hooks/UpdataScheduleApi';
import ButtonSimple from '../Button/ButtonSimple';
import SubmitSimple from '../Button/SubmitSimple';
import DeleteScheduleApi from '../../Hooks/DeleteSchedule';
import { changeStateStore } from '../../zustandStore/zustandChangeState';
import { isPopupStore } from '../../zustandStore/zustandIsPopup';

const SchedulePopupForm = () => {
    const { isSchedulePopup,year,month,day,id,color,usertext,setSchedulePopupOut } = schedulePopupStore();
    const { isDarkMode } = DarkModeStore();
    const { isColorPallet, setIsColorPalletChange} = isColorPalletStore();
    const { setChange } = changeStateStore();
    const { setPopupOut } = isPopupStore();
    const [inputUsertext, setInputUsertext] = useState<string>();
    const [inputColor, setInputColor] = useState<string>();
    const ColorData:Array<string> = ColorPallet();

    useEffect(()=>{
        if(color)
            setInputColor(color);
        else
            setInputColor("blue");

        if(usertext)
           setInputUsertext(usertext);
        else
            setInputUsertext("")
    },[color,usertext,isSchedulePopup])

    const reroadEvent = () => {
        setChange();
        setIsColorPalletChange(true);
        setPopupOut();
        setSchedulePopupOut();
    }

    const formEvent = async(e:any) => {
        e.preventDefault();
        let data;
        if(id == null){
            if(year!=null && month!=null && day!=null && inputColor!=null && inputUsertext!=null){
                data = {
                    year:year,
                    month:month,
                    day:day,
                    color:inputColor,
                    usertext:inputUsertext,
                }
            }else{
                console.log(year,month,day,inputColor,inputUsertext)
                console.log("비상");
                return;
            }
            // 일정 새로 삽입
            InsertScheduleApi(data)
            .then(reroadEvent)
        }else{
            if(year!=null && month!=null && day!=null && inputColor!=null && inputUsertext!=null && id!=null){
                data = {
                    year:year,
                    month:month,
                    day:day,
                    color:inputColor,
                    usertext:inputUsertext,
                    id:id
                }
            }else{
                console.log(year,month,day,inputColor,inputUsertext,id)
                console.log("비상");
                return;
            }
            // 일정 수정
            UpdataeScheduleApi(data)
            .then(reroadEvent)
        }
    }

    const deleteEvent = () => {
        if(id !=null)
        {
            DeleteScheduleApi(id)
            .then(reroadEvent)
        }
    }
    
    return(
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{opacity: 1,y: 0,transition: { delay: 0.1 },}}
        className={`w-[100%] min-[800px]:w-[40%] h-[55%] rounded-t-[50px] p-6 absolute min-[800px]:left-[30%] bottom-0 ${isDarkMode?"bg-zinc-900":"bg-white"} `}
        onClick={(e:any) => {e.stopPropagation()}}>

            {/* x버튼 */}
            <motion.div whileHover={{ scale: 1.3 }} className="w-7 h-7 absolute right-5 top-5 cursor-pointer" onClick={()=>{setSchedulePopupOut();setIsColorPalletChange(true);}}>
                <img src="/Icon/Xgray.png" alt="cancle" className="w-full h-full" />
            </motion.div>

            {/* 폼 */}
            <form onSubmit={formEvent} className="flex flex-col">
                {/* 유저일정 입력 */}
                <input type="text" name="usertext" maxLength={50} onChange={(e)=>setInputUsertext(e.target.value)} spellCheck={false} value={inputUsertext} className="bg-[#00000000] w-[90%] h-10 mt-6 mb-3 text-2xl" placeholder="일정 메모" required/>
                {/* 색상 보여주는 박스 */}
                <span className="flex flex-row items-center">
                    <motion.a whileHover={{ scale: 1.2 }} className={`w-7 h-7 rounded-lg ${inputColor} cursor-pointer relative`} onClick={()=>setIsColorPalletChange(isColorPallet)}/>
                    <p className="text-xl ml-2 font-bold ">Color</p>
                </span>
                {/* 색상 파레트 */}
                <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{opacity: 1,y: 0,transition: { delay: 0.1 },}} onClick={(e:any) => {e.stopPropagation()}} className={`z-60 w-[250px] h-[200px] rounded-xl p-2 mt-1 grid grid-cols-4 gap-3 ${isDarkMode?"bg-zinc-800":"bg-slate-100"} ${isColorPallet?"block":"hidden"}`}>
                    {ColorData.map((item, index) => (
                        <div key={index} className='w-full h-full flex items-center justify-center'><motion.div whileHover={{ scale: 1.2 }} onClick={()=>{setInputColor(item);setIsColorPalletChange(isColorPallet)}} key={index} className={`w-11 h-11 rounded-lg ${item} cursor-pointer`}/></div>
                    ))}
                </motion.div>
                <div className='flex flex-row w-full justify-center'>
                    <div className={`${id?'block':'hidden'} mr-2`}><ButtonSimple onClick={deleteEvent} label='삭제' /></div>
                    <SubmitSimple label={`${id?'수정':'등록'}`}/>
                </div>    
            </form>
            
        </motion.div>
    )
}

const SchedulePopup = () => {
    const { isSchedulePopup , setSchedulePopupOut } = schedulePopupStore();
    const { setIsColorPalletChange} = isColorPalletStore();
    
    return(
        <div className={`w-full h-full absolute z-40 backdrop-blur transition-all duration-300 ease-in-out transform ${isSchedulePopup ? "block" : "hidden"}`} onClick={()=>{setSchedulePopupOut();setIsColorPalletChange(true)}}>
            <SchedulePopupForm/>
        </div>
    )
}

export default SchedulePopup; 