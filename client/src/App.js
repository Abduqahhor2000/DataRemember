import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/screens/Login"
import Register from "./components/screens/Register"
import Private from "./components/screens/Private"
import ForgotPassword from "./components/screens/ForgotPassword"
import ResetPassword from "./components/screens/ResetPassword"
import PrivateRoute from "./components/routing/PrivateRoute"
import './App.css';
import axios from "axios"

const App = () => {
  axios.defaults.baseURL = "https://dataremember.herokuapp.com/"
  console.log(axios.defaults.baseURL)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Private/></PrivateRoute>}/>
          <Route exact path="/private" element={<PrivateRoute><Private/></PrivateRoute>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
          <Route exact path="/resetpassword/:resetToken" element={<ResetPassword/>} />
        </Routes>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
