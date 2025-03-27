import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Aboutus from "./pages/Aboutus";
import Signup from "./components/common/Signup";
import Login from "./components/common/Login";
import OTPpage from "./components/common/OTPpage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<OTPpage />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

// "server": "cd server && npm run dev",
