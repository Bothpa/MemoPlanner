interface UserScheduleBlockProps {
    color : string | null;
    userText : string | null;
  } 

const UserScheduleBlock: React.FC<UserScheduleBlockProps> = ({color, userText}) => {
    return (
    <div className={`w-[100%] h-fit text-white text-[13px] max-[800px]:text-[11px] rounded mb-[3px] no-wrap ${color}`}>
      {userText}
    </div>
    )
}

export default UserScheduleBlock;