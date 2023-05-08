import { defaultPicUrl } from "../consts";
import { IUser } from "../services/user.type";

export default function ProfileModal({
  selectedUser,
}: {
  selectedUser: IUser;
}) {
  return (
    <>
      <input
        type="checkbox"
        id="talker-details-modal"
        className="modal-toggle"
      />
      <label htmlFor="talker-details-modal" className="modal cursor-pointer">
        <label
          className="modal-box relative flex flex-col gap-8 justify-items-center"
          htmlFor=""
        >
          <div className="profile-pic w-48 m-auto mt-8">
            <img src={selectedUser?.pic || defaultPicUrl} className="rounded" />
          </div>
          <div className="profile-details text-3xl text-center">
            <div className="name text-primary">{selectedUser.name}</div>
            <div className="email text-slate-300 mt-4">
              {selectedUser.email}
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
