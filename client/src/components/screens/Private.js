import { useState, useEffect } from "react";
import axios from "axios";
import "./private.scss";
import { useLocation } from "react-router-dom";

const Private = () => {
  const history = useLocation();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        history("/login")
      }
    };

    fetchPrivateDate();
  }, [history]);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>{privateData}</div>
  );
};

export default Private;