import { IUser } from "../services/user.type";

const defaultPic =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export default ({ user }: { user: IUser }) => {
  return (
    <div className="user-item flex justify-between items-center">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user.pic || defaultPic} />
        </div>
      </label>
      <div className="ml-4">
        <div className="text-lg text-primary">
          {String(user.name).slice(0, 20)}
        </div>
        <div className="text-slate-300">
          Email: {String(user.email).slice(0, 20)}
        </div>
      </div>
    </div>
  );
};
