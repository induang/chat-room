interface UserItemProps {
  userName: string;
  pic: string;
  userEmail: string;
}
const defaultPic =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export default ({ userName, pic, userEmail }: UserItemProps) => {
  return (
    <div className="user-item flex justify-between items-center">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={pic || defaultPic} />
        </div>
      </label>
      <div className="ml-4">
        <div className="text-lg text-primary">{userName}</div>
        <div className="text-slate-300">Email: {userEmail}</div>
      </div>
    </div>
  );
};
