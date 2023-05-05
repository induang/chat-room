import DrawerBTN from "./DrawerBTN";
import ProfileMenu from "./ProfileMenu";
export default function Header() {
  return (
    <>
      <div className="header-flex-container bg-white/50 rounded p-3 flex justify-between items-center">
        <span>
          <DrawerBTN />
        </span>
        <span className="text-3xl">Chat room</span>
        <span>
          <ProfileMenu />
        </span>
      </div>
    </>
  );
}
