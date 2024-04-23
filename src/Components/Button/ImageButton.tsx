import { motion } from "framer-motion";
import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface ImageButtonProps {
    img:string;
    func : () => void;
}


const ImageButton:React.FC<ImageButtonProps> = ({img, func}) => {
    const isDarkMode = DarkModeStore(state => state.isDarkMode);

    return <motion.img whileHover={{ scale: 1.2 }} src={`/Icon/${img}${isDarkMode?'White':''}.png`} alt="" className={`w-7 h-7 cursor-pointer`} onClick={func}/>

}

export default ImageButton;