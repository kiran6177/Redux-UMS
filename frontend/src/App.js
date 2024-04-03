import './App.css';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import SignupPage from './Pages/SignupPage';
import UserHomePage from './Pages/UserHomePage';
import ProfilePage from './Pages/ProfilePage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import AdminCreateUserPage from './Pages/AdminCreateUserPage';
import AdminEditUserPage from './Pages/AdminEditUserPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/admin' element={<AdminDashboardPage />} />
      <Route path='/admin/login' element={<AdminLoginPage/>} />
      <Route path='/admin/createuser' element={<AdminCreateUserPage/>}/>
      <Route path='/admin/edituser' element={<AdminEditUserPage/>}/>
      <Route  path='/login' element={<LoginPage/>}/>
      <Route  path='/signup' element={<SignupPage/>}/>
      <Route  path='/' element={<UserHomePage/>}/>
      <Route  path='/profile' element={<ProfilePage/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
