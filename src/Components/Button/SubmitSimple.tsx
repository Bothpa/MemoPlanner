import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

interface ButtonSimpleProps {
    label:string;
}
  

const SubmitSimple: React.FC<ButtonSimpleProps> = ({ label }) => {
    const isDarkMode = DarkModeStore(state => state.isDarkMode);
    return (
      <button className={`w-fit h-fit text-base p-1 mr-1 rounded-lg ${isDarkMode ? 'myAllBorder-dark' : 'myAllBorder-light'}`} type="submit">{label}</button>
    );
  }

export default SubmitSimple;