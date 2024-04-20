import { motion } from "framer-motion";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface MemoSelectListItemProps {
    MemoId : number;
    MemoContent : string;
    MemoDate : Date;
}

const MemoSelectListItem:React.FC<MemoSelectListItemProps> = ({MemoId, MemoContent, MemoDate}) => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

return (
    <motion.div whileHover={{ scale: 1.05 }} className={`w-[100%] h-fit flex flex-col p-2 mb-4 border-b rounded-md cursor-pointer ${isDarkMode ? 'dark border-zinc-700 hover:bg-[#0D1922]' : 'light border-zinc-300 hover:bg-sky-100'}`}>
        <div className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{MemoContent}</div>
        <div className="mt-2 text-sm">{MemoDate.toDateString()}</div>
    </motion.div>
);
}

const MemoSelect = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

return (
    <div className={`w-[20%] h-full p-3 flex flex-col overflow-y-auto ${isDarkMode ? 'dark border-r-[1px] border-zinc-800' : 'light border-r-2'}`}> 
        {Array.from({ length: 30 }).map((_, i) => (
            <MemoSelectListItem key={i} MemoId={i} MemoContent={`${i}. 안녕하세요 정송훈입니다. ㅎㅎ`} MemoDate={new Date()}/>
        ))}
    </div>
);
}

export default MemoSelect;