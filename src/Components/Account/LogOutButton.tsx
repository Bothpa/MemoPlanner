import { accountStore } from "../../zustandStore/zustandAccount";
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
    const navigate = useNavigate();
    const { setAccountLogout } = accountStore();
    const LogOutEvent = () => {
        sessionStorage.clear();
        setAccountLogout();
        navigate('/')
        window.location.reload();
    }
    return <button onClick={LogOutEvent} className="w-fit h-fit">로그아웃</button>;
}

export default LogOutButton;