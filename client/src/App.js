import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/screens/Login"
import Register from "./components/screens/Register"
import Private from "./components/screens/Private"
import ForgotPassword from "./components/screens/ForgotPassword"
import ResetPassword from "./components/screens/ResetPassword"
import './App.css';
import PrivateRoute from "./components/routing/PrivateRoute"


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PrivateRoute><Private/></PrivateRoute>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="forgotpassword" element={<ForgotPassword/>} />
          <Route path="resetpassword/:resetToken" element={<ResetPassword/>} />
        </Routes>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
