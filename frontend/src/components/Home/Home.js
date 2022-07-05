import * as React from "react";
import "reactjs-popup/dist/index.css";
// import "./Home.css";
import { useState, useEffect, useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";

const code = new URLSearchParams(window.location.search).get("code");

function Home() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!code) return;
    axios
      .post(`${process.env.REACT_APP_URL}/auth/callback`, {
        auth_code: code,
      })
      .then((res) => {
        setExpiresIn(res.data.expiresIn);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        window.history.pushState({}, null, "/home");
        return res.data.refreshToken;
      })
      .then((r) => {
        axios.post(
          `${process.env.REACT_APP_URL}/update`,
          { refreshToken: r },
          { withCredentials: true }
        );
      })
      .catch((error) => {
        console.log(error);
        // window.location = "/spotify"
      });
  }, [code]);

  useEffect(() => {
    if (isMounted.current) {
      if (!refreshToken) return;
      refresh();
      setInterval(refresh, (expiresIn - 60) * 1000);
    } else {
      isMounted.current = true;
    }
  }, [refreshToken]);

  function refresh() {
    axios
      .post(`${process.env.REACT_APP_URL}/auth/refresh`, {
        refreshToken,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* ------ useState setup ------ */
  const [user, setUser] = useState();
  const [userSetting, setUserSetting] = useState(user); // logout

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setIsLoggedIn(true);
  }, [accessToken]);

  useEffect(() => {
    if (userSetting === "Logout") {
      logout();
    }
  }, [userSetting]);

  function logout() {
    axios
      .get(`${process.env.REACT_APP_URL}/logout`, { withCredentials: true })
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="home">
      <div className="user-settings">
        <Dropdown
          selected={userSetting}
          setSelected={setUserSetting}
          setLoggedIn={isLoggedIn}
          purpose="user"
        />
      </div>
    </div>
  );
}

export default Home;
