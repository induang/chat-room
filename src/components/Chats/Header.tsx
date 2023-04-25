import ProfileMenu from "./ProfileMenu";
import SideDrawer from "./SideDrawer";

export default () => {
  return (
    <>
      <div className="bg-white/50 rounded">
        <div className="p-3 flex justify-between items-center">
          <span className="w-4">
            <SideDrawer />
          </span>
          <span className="text-3xl">Chat room</span>
          <span>
            <ProfileMenu />
          </span>
        </div>
      </div>
    </>
  );
};
