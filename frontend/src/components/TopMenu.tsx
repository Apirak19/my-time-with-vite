import MenuButton from "./MenuButton";

const TopMenu = () => {
  return (
    <div className="flex justify-end items-center relative h-10 p-4 bg-slate-600 gap-2">
      <h4>Username</h4>
      <h4>MoreNames</h4>
      <MenuButton />
    </div>
  );
};

export default TopMenu;
