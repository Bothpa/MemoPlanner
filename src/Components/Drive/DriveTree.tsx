import { useEffect } from "react";
import fileTreeStore from "../../zustandStore/zustandFileTreeStore";

const DriveTree = () => {
  const { fileTree } = fileTreeStore();
  return <div className="w-full h-full bg-white"></div>;
};

export default DriveTree;
