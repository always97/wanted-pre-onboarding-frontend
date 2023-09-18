import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Box, Button, Card, TextField } from "@mui/material";
import { signUpAPI } from "../apis/apis";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const navigate = useNavigate();

  const handleInputEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(newEmail === "" ? null : newEmail.includes("@"));
  };
  const handleInputPwd = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword === "" ? null : newPassword.length >= 8); // 비밀번호 유효성 검사
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    signUpAPI(email, password)
      .then((res) => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
        alert(error.response.data.message);
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
      <h2>회원가입페이지</h2>
      <form onSubmit={handleSignUp}>
        <Card sx={{ minWidth: 400 }}>
          <Box className={styles.email}>
            <TextField
              variant="outlined"
              type="email"
              id="email"
              label="email을 입력해주세요"
              data-testid="email-input"
              onChange={handleInputEmail}
            />
            {isEmailValid === false && (
              <p style={{ color: "red" }}>
                유효한 이메일 형식이 아닙니다. ('@' 포함 필수)
              </p>
            )}
          </Box>
          <Box className={styles.pwd}>
            <TextField
              id="Password"
              label="Password를 입력해주세요."
              type="password"
              autoComplete="current-password"
              data-testid="password-input"
              onChange={handleInputPwd}
            />
            {isPasswordValid === false && (
              <p style={{ color: "red" }}>비밀번호는 8자 이상이어야 합니다.</p>
            )}
          </Box>
        </Card>
        <Button
          variant="outlined"
          type="submit"
          data-testid="signup-button"
          disabled={!isEmailValid || !isPasswordValid}
        >
          가입하기
        </Button>
        <Button variant="outlined" onClick={() => navigate("/signin")}>
          로그인으로 이동
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
