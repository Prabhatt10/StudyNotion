import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import { useState } from 'react';
import Navbar from './component/common/Navbar';
import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-[#000814] font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/resetPassword' element={<ForgetPassword setIsLoggedIn={setIsLoggedIn}/> } />
        <Route path="/updatePassword/:token" element={<UpdatePassword setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
