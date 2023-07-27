import clsx from "clsx";
import { APP_NAME } from "../../consts";
import DrawerBTN from "./DrawerBTN";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
export default function Header() {
  const isSelectedChat = useSelector(
    (state: RootState) => state.chat.isExistedChatSelected,
  );
  return (
    <div
      className={clsx(
        "header-flex-container bg-white rounded p-3 flex justify-between items-center",
      )}
    >
      <span>
        <DrawerBTN />
      </span>
      <span className="hidden sm:block text-3xl">{APP_NAME}</span>
      <span>
        <ProfileMenu />
      </span>
    </div>
  );
}
