import React from 'react';
import GitHubLogin from './GitHubLogin';

const LoggedOutView: React.FC = () => {
    return (
        <div>
            <GitHubLogin />
        </div>
    );
};

export default LoggedOutView;