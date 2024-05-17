  import { DarkModeStore } from "../../zustandStore/zustandDarkMode";
import PostDriveFile from "../../Hooks/PostDriveFile";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";
import GetFileTreeApi from "../../Hooks/GetFileTree";
import PostDriveMkdir from "../../Hooks/PostDriveMkdir";

interface DriveBarProps {
  nowPathUrl: string;
}

const DriveBar: React.FC<DriveBarProps> = ({ nowPathUrl }) => {
  const { isDarkMode } = DarkModeStore();

  const FileUploadEvent = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    formData.append("path", nowPathUrl);
    PostDriveFile(formData)
      .then(async (res) => {
        const data = await GetFileTreeApi();
        fileTreeStore.setState({ fileTree: data });
        formData.delete("file");
        e.target.file.value = "";
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    <div
      className={`w-full p-4 pl-2 flex flex-row ${
        isDarkMode ? "dark border-b-[1px] border-zinc-800" : "light border-b-2"
      }`}
    >
      <form onSubmit={FileUploadEvent}>
        <input type="file" name="file" />
        <button>업로드</button>
      </form>

      <button onClick={mkdirEvent}>폴더 생성</button>
    </div>
  );
};

export default DriveBar;
