import { accountStore } from '../../zustandStore/zustandAccount';
import { useState } from 'react';
import AccountPopup from '../Popup/AccountPopup';

const LoginStatus = () => {
    const [isAccountPopup, setIsAccountPopup] = useState<boolean>(false);
    const { isLogin, id, name, profileImg } = accountStore();
    return(
        <div className='fixed top-1 right-4 w-fit h-fit text-lg'>
            {isLogin?(
                <div onClick={()=>setIsAccountPopup(!isAccountPopup)} className='font-bold cursor-pointer flex flex-row justify-center items-center'>
                    <img src={profileImg} className='w-[30px] h-[30px] mr-2 rounded-2xl' alt="profileImg" />
                    {id}({name})
                </div>
            ):(
                <div onClick={()=>setIsAccountPopup(!isAccountPopup)} className="font-bold cursor-pointer">
                    Sign In
                </div>
            )}
            <AccountPopup isAccountPopup={isAccountPopup}/>
        </div>
    )
}

export default LoginStatus;