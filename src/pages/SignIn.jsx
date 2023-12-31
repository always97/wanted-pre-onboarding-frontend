import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { signInAPI } from "../apis/apis";
import { Box, Button, Card, TextField } from "@mui/material";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: null, password: null });
  const navigate = useNavigate();

  const handleInputEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };
  const handleInputPwd = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInAPI(userInfo.email, userInfo.password)
      .then((res) => {
        const accessToken = res.data.access_token;
        localStorage.setItem("wanted_accessToken", accessToken);
        navigate("/todo");
      })
      .catch((error) => {
        console.error("로그인 오류:", error);
      });
  };

  useEffect(() => {
    const access_token = localStorage.getItem("wanted_accessToken");
    // 로그인 상태에서 url상으로 직접 접속시 todo페이지로 redirect
    if (access_token) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className={styles.main}>
      <h2>로그인페이지</h2>
      <form onSubmit={handleLogin}>
        <Card>
          <Box className={styles.email} sx={{ display: "flex", minWidth: 300 }}>
            <TextField
              variant="outlined"
              type="email"
              id="email"
              label="email"
              data-testid="email-input"
              onChange={handleInputEmail}
            />
          </Box>
          <Box className={styles.pwd}>
            <TextField
              id="Password"
              label="Password"
              type="password"
              autoComplete="current-password"
              data-testid="password-input"
              onChange={handleInputPwd}
            />
          </Box>
        </Card>
        <Button variant="outlined" type="submit" data-testid="signin-button">
          로그인
        </Button>
        <Button variant="outlined" onClick={() => navigate("/signup")}>
          회원가입으로 이동
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
