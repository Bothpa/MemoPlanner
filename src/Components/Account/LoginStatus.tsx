import { accountStore } from '../../zustandStore/zustandAccount';
import { useNavigate } from 'react-router-dom';

const LoginStatus = () => {
    const navigate = useNavigate();
    const { isLogin, id, name } = accountStore();
    return(
        <div className='fixed top-2 right-4 w-fit h-fit'>
        {isLogin?(
            <div onClick={()=>navigate('/account')} className='font-bold text-mg cursor-pointer'>{id}({name})</div>
        ):(
            <div onClick={()=>navigate('/account')} className="font-bold text-mg cursor-pointer">Sign In</div>
        )}
        </div>
    )
}

export default LoginStatus;