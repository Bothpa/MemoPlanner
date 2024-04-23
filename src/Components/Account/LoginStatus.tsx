import { accountStore } from '../../zustandStore/zustandAccount';
import { useState } from 'react';
import AccountPopup from '../Popup/AccountPopup';

const LoginStatus = () => {
    const [isAccountPopup, setIsAccountPopup] = useState<boolean>(false);
    const { isLogin, id, name, profileImg } = accountStore();
    return(
        <div className='fixed top-2 right-2 w-fit h-fit text-lg max-[800px]:text-base'>
            {isLogin?(
                <div onClick={()=>setIsAccountPopup(!isAccountPopup)} className='font-bold cursor-pointer flex flex-row justify-center items-center'>
                    <img src={profileImg} className='w-[40px] h-[40px] max-[800px]:w-[30px] max-[800px]:h-[30px] mr-2 rounded-2xl' alt="profileImg" />
                    {/* {id}({name}) */}
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