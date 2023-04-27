import ProfileMenu from "./ProfileMenu";
import SideDrawer from "./SideDrawer";

export default () => {
  return (
    <>
      <SideDrawer />
      <div className="header-flex-container bg-white/50 rounded p-3 flex justify-between items-center">
        <span></span>
        <span className="text-3xl">Chat room</span>
        <span>
          <ProfileMenu />
        </span>
      </div>
      <div className="drawer"></div>
    </>
  );
};
