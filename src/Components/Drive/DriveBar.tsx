import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";
import GetFileTreeApi from "../../Hooks/GetFileTree";
import PostDriveMkdir from "../../Hooks/PostDriveMkdir";

interface DriveBarProps {
  nowPathUrl: string;
  goBack: () => void;
}

const DriveBar: React.FC<DriveBarProps> = ({ nowPathUrl, goBack }) => {
  const mkdirEvent = async () => {
    const folderName = prompt("폴더 이름을 입력해주세요.");
    if (!folderName) return;
    await PostDriveMkdir(folderName, nowPathUrl)
      .then(async (res) => {
        const data = await GetFileTreeApi();
        fileTreeStore.setState({ fileTree: data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={`w-full p-2 pl-2 flex flex-row items-center mb-3`}>
      <div onClick={goBack} className="cursor-pointer">
        뒤로가기
      </div>
      <img
        src="/Icon/Mkdir.png"
        onClick={mkdirEvent}
        className="w-10 h-10 cursor-pointer ml-auto mr-auto hover:bg-zinc-200 rounded-md"
      />
    </div>
  );
};

export default DriveBar;
