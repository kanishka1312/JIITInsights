// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import IndexPage from './pages/IndexPage.jsx';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import HostPage from './pages/HostPage';
// import Layout from './Layout';
// import axios from 'axios';
// import { UserContextProvider } from './UserContext';
// import HostedFormPage from './pages/HostedFormPage';
// import HostedPage from './pages/HostedPage';
// import ParticipatedPage from './pages/ParticipatedPage';
// import ParticipatePage from './pages/ParticipatePage'; 
// import SelectedSociety from './pages/selectedSociety';
// import ListAdmins from './pages/ListAdmins.jsx';
// import AddAdmin from './pages/AddAdmin.jsx';
// import LoginAdmin from './pages/LoginAdmin.jsx';
// import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
// import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
// import MerchandiseApp from './MerchandiseApp.jsx';
// import ContactPage from './pages/ContactPage.jsx';



// axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.withCredentials = true;

// function App() {
//   return (
//     <UserContextProvider>
//       <Routes>
//         <Route path="/" element={<Layout />} >
//           <Route index element={<IndexPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
//           <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//           <Route path="/account" element={<ProfilePage />} />
//           <Route path="/account/hosted" element={<HostPage />} />
//           <Route path="/account/hosted/new" element={<HostedFormPage />} />
//           <Route path="/account/hosted/:id" element={<HostedFormPage />} />
//           <Route path="/host/:id" element={<HostedPage />} />
//           <Route path="/account/participated" element={<ParticipatedPage />} />
//           <Route path="/account/participated/:id" element={<ParticipatePage />} />
//           <Route path="/society/:selectedSociety" element={<SelectedSociety />} />
//           <Route path="/admin/list" element={<ListAdmins />} />
//           <Route path="/admin/add" element={<AddAdmin />} />
//           <Route path="/admin/login" element={<LoginAdmin />} />
//           <Route path="/merchandise/*" element={<MerchandiseApp />} />
//           <Route path="/contact" element={<ContactPage />} />
//         </Route>
//       </Routes>
//     </UserContextProvider>
//   )
// }

// export default App


import { useState } from "react";
import { createContext } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
// import Login from "./components/Login";
// import OTPInput from "./components/OTPInput";
// import Recovered from "./components/Recovered";
// import Reset from "./components/Reset";
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HostPage from './pages/HostPage';
import Layout from './Layout';
import { UserContextProvider } from './UserContext';
import HostedFormPage from './pages/HostedFormPage';
import HostedPage from './pages/HostedPage';
import ParticipatedPage from './pages/ParticipatedPage';
import ParticipatePage from './pages/ParticipatePage'; 
// import SelectedSociety from './pages/selectedSociety';
import SelectedSociety from "./pages/SelectedSociety.jsx";
import ListAdmins from './pages/ListAdmins.jsx';
import AddAdmin from './pages/AddAdmin.jsx';
import LoginAdmin from './pages/LoginAdmin.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import MerchandiseApp from './MerchandiseApp.jsx';
import ContactPage from './pages/ContactPage.jsx';
import OTPInput from "./pages/OTPInput.jsx";
import Recovered from "./pages/Recovered.jsx";
import Reset from "./pages/Reset.jsx";


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const RecoveryContext = createContext();

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "login") return <LoginPage />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    return <Recovered />;
  }

  return (
    <UserContextProvider>
      <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, setEmail, email }}
      >
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/hosted" element={<HostPage />} />
            <Route path="/account/hosted/new" element={<HostedFormPage />} />
            <Route path="/account/hosted/:id" element={<HostedFormPage />} />
            <Route path="/host/:id" element={<HostedPage />} />
            <Route path="/account/participated" element={<ParticipatedPage />} />
            <Route path="/account/participated/:id" element={<ParticipatePage />} />
            <Route path="/society/:selectedSociety" element={<SelectedSociety />} />
            <Route path="/admin/list" element={<ListAdmins />} />
            <Route path="/admin/add" element={<AddAdmin />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/merchandise/*" element={<MerchandiseApp />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </RecoveryContext.Provider>
    </UserContextProvider>
  );
}

export default App;
