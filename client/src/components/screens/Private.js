import { useState, useEffect } from "react";
import axios from "axios";
import "./private.scss";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../../store/actions/userDataAction";

const Private = () => {
  const State_User = useSelector( state => state.user.user)
  const dispatch = useDispatch()
  const history = useLocation();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      if(!State_User.token){
        history("/login")
        return
      }
      console.log(State_User.token)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${State_User.token}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        dispatch(clearUserData());
        setError("You are not authorized please login");
        history("/login")
      }
    };

    fetchPrivateDate();
  }, [history]);
  return error ? (
    <><span className="error-message">{error}</span></>
  ) : (
    <div>{privateData}</div>
  );
};

export default Private;