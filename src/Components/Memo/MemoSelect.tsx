import { motion } from "framer-motion";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMemolistApi } from "../../Hooks/GetMemoListApi";
import { accountStore } from "../../zustandStore/zustandAccount";
import { InsertMemoApi } from "../../Hooks/InsertMemoApi";
import ImageButton from "../Button/ImageButton";

interface MemoSelectListItemProps {
    MemoId : number;
    MemoContent : string;
    MemoDate : Date;
}

interface Memolist {
  id : number;
  userId : string;
  content : string;
  date : string;
}

const MemoSelectListItem:React.FC<MemoSelectListItemProps> = ({MemoId, MemoContent, MemoDate}) => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const navigate = useNavigate();

  const MemoSelectEvent = () => {
    navigate(`/memoeditor?memoId=${MemoId}`);
  }

return (
    <motion.div whileHover={{ scale: 1.05 }} onClick={MemoSelectEvent} className={`w-[100%] h-fit flex flex-col p-3 mb-3 border rounded-md cursor-pointer ${isDarkMode ? 'dark border-zinc-700 hover:bg-[#0D1922]' : 'light border-zinc-300 hover:bg-sky-100'}`}>
        <div className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{MemoContent==='' || MemoContent === null ?'내용을 입력하세요.':MemoContent}</div>
        <div className="mt-2 text-sm">{MemoDate.toDateString()}</div>
    </motion.div>
);
}

const MemoSelect = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const [MemoList, setMemoList] = useState<Memolist[]>();
  const { isLogin } = accountStore();

  const MemoListEvent = async() => {
    const MemoList = await GetMemolistApi();
    if(MemoList)
    {
      setMemoList(MemoList);
    }
  }
  const MemoInsertEvent = async() => {
    await InsertMemoApi()
    .then((res) => {
      if(res) MemoListEvent();
    })
  }

  const PostMemoEvent = () => {
    MemoInsertEvent();
  }

  useEffect(() => {
    if(isLogin || sessionStorage.getItem('accessToken')) MemoListEvent();
  },[]);

return (
    <div className={`w-[30%] max-[800px]:w-full h-full ${isDarkMode ? 'dark border-r-[1px] border-zinc-800' : 'light border-r-2'}`}>

        <div className={`w-full h-[5%] pl-3 flex items-center ${isDarkMode ? 'dark border-b-[1px] border-zinc-800' : 'light border-b-2'}`}>
            <ImageButton img="PostMemo" func={PostMemoEvent}/>
        </div>

        <div className={`w-full h-[95%] p-3 pt-4 flex flex-col overflow-y-auto`}> 
            {MemoList?.map((item, index) => {
                return <MemoSelectListItem key={index} MemoId={item.id} MemoContent={item.content} MemoDate={new Date(item.date)}/>
            })}
        </div>

    </div>
);
}

export default MemoSelect;