import { accountStore } from "../../zustandStore/zustandAccount";
import { useNavigate } from 'react-router-dom';
import { removeCookie } from "../..";

const LogOutButton = () => {
    const navigate = useNavigate();
    const { setAccountLogout } = accountStore();
    const LogOutEvent = () => {
        sessionStorage.clear();
        removeCookie();
        setAccountLogout();
        navigate('/')
        window.location.reload();
    }
    return  <button onClick={LogOutEvent} className="w-full h-fit p-[7px] flex flex-row items-center justify-center text-lg font-bold text-white bg-zinc-800 rounded-xl shadow-md">
                로그아웃
            </button>;
}

export default LogOutButton;