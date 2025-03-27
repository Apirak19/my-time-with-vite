import { useEffect } from "react";
import "./App.css";
import TimerOOP from "./components/TimerOOP";

import { useContextA } from "./context/ContextA";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {
  const { items } = useContextA();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>

    
  );
}

export default App;
