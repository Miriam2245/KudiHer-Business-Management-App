import "./themes/global.css";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar/SideBar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import CreateAccount from "./pages/CreateAccount/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/create-account" element={<CreateAccount />} />

      {/* App pages - with sidebar */}
      <Route
        path="/dashboard"
        element={
          <main className="appContainer">
            <SideBar />
            <Dashboard />
          </main>
        }
      />
    </Routes>
  );
}

export default App;
