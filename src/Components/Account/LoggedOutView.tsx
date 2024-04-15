import React from 'react';
import GitHubLogin from './GitHubLogin';

const LoggedOutView: React.FC = () => {
    return (
        <div className='h-1/2 w-fit p-5 flex justify-center border-[0.2px] border-zinc-700 rounded-lg shadow-xl'>
            <GitHubLogin/>
        </div>
    );
};

export default LoggedOutView;