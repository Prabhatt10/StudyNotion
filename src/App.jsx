import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUp'
import { useState } from 'react';

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-[#000814] font-inter flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element ={<LoginPage setisLoggedIn={setisLoggedIn} />} />
        <Route path='/signup' element ={<SignUpPage setisLoggedIn={setisLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
