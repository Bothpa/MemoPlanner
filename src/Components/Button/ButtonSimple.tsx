import { DarkModeStore } from "../../zustandStore/zustandDarkMode";


interface ButtonSimpleProps {
    label:string;
    onClick: ()=>void;
  }
  
const ButtonSimple: React.FC<ButtonSimpleProps> = ({ onClick, label }) => {
    const isDarkMode = DarkModeStore(state => state.isDarkMode);
    return (
      <button type="button" className={`w-fit h-fit text-base p-1 mr-1 rounded-lg ${isDarkMode ? 'myAllBorder-dark' : 'myAllBorder-light'}`} onClick={onClick}>{label}</button>
    );
  }

export default ButtonSimple;