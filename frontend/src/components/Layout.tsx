import { Outlet } from "react-router-dom";
import TopMenu from "./TopMenu";

export default function Layout() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      <TopMenu />
      <main className="flex-1 flex justify-center items-center p-4">
        <Outlet />
      </main>
      <footer className="w-full p-4 text-center text-sm">
        © 2025 My Time with Vite. All rights reserved.
      </footer>
    </div>
  );
}
