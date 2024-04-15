import React from 'react';
import LogOutButton from './LogOutButton';

const LoggedInView: React.FC = () => {
    return (
        <div className='h-1/2 w-fit p-5 flex justify-center border-[0.2px] border-zinc-700 rounded-lg shadow-xl'>
            <LogOutButton/>
        </div>
    );
};

export default LoggedInView;