import MenuButton from "./MenuButton";

const TopMenu = () => {
  return (
    <div className="flex justify-end items-center relative w-full h-10 bg-slate-600">
      <a className="flex gap-2 text-white" href="/profile">
        <h4>Username</h4>
        <h4>MoreNames</h4>
      </a>
      <MenuButton />
    </div>
  );
};

export default TopMenu;
