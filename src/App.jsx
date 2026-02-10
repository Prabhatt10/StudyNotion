import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Routes & Components
import OpenRoute from './component/core/Auth/OpenRoute';
import PrivateRoute from './component/core/Auth/PrivateRoute';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import MyProfile from './component/core/Dashboard/MyProfile'
import Settings from './component/core/Dashboard/Settings/settings'
import EnrolledCourses from './component/core/Dashboard/EnrolledCourses';
import Cart from './component/core/Dashboard/Cart/Cart';

// Pages
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/Error'


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-[#000814] font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUpPage />
            </OpenRoute>
            //<SignUpPage />
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
            // <LoginPage />
          }
        />

        <Route
          path="/resetPassword"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/updatePassword/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<AboutPage />} />

        <Route 
          // path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />
          <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
          <Route path='/dashboard/cart' element={<Cart />} />
        </Route>

        

        <Route path='*' element={<ErrorPage />} />

      </Routes>
      <Footer />
    </div>
  );}

export default App;
