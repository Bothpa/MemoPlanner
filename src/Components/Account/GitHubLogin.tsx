import { DarkModeStore } from "../../zustandStore/zustandDarkMode";

const GitHubLogin = () => {
  const { isDarkMode } = DarkModeStore();
  const githubLogin = async() => {
    window.location.href=`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  }

  return  <button onClick={githubLogin} className={`w-fit h-fit p-[7px] flex flex-row items-center text-lg font-bold text-white bg-zinc-900 rounded-xl shadow-md`}>
            <img src={`/Icon/Github.png`} alt="github" className="w-8 mr-3" />Github 계정으로 로그인
          </button>;
}

export default GitHubLogin;