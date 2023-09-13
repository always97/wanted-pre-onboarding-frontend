import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Main = () => {
  const [access_token, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("wanted_accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("wanted_accessToken");
    setAccessToken(token);
  }, []);

  return (
    <div className={styles.main}>
      {access_token === null ? (
        <div>
          <h2>로그인후 이용가능합니다.</h2>
          <div className={styles.navBtn}>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              로그인
            </Button>
            <br />
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              회원가입
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2>hello wanted !!</h2>
          <div className={styles.log}>
            <p>로그인된 상태입니다.</p>
            <Button variant="outlined" onClick={handleLogOut}>
              로그아웃
            </Button>
          </div>
          <Link to="/todo">Todo리스트로 이동하기</Link>
        </div>
      )}
    </div>
  );
};

export default Main;
