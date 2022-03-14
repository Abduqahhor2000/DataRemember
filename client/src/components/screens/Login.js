import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "../../store/actions/userDataAction";
import "./login.scss";

const Login = () => {
  const State_User = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (State_User?.token) {
      navigate("/user");
      return;
    }
  }, [navigate, State_User]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      dispatch(addUserData(data))

      // history("/private");
    } catch (error) {
      console.log(error);
      setError("Xatolik ro'y berdi. Iltimos qayta urunib ko'ring!")
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;