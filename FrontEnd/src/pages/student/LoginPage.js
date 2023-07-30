import React, { useState } from "react";
import styled from "styled-components";
import { selectCurrentTokenr, setCredentials } from "features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import KITSLogo from "../../assets/images/kits-logo.svg";
import AsATutor from "../../assets/icons/as-tutor.svg";
import { Button } from "components/Button/Button";
import FacebookIcon from "../../assets/icons/facebook-icon.svg";
import GoogleIcon from "../../assets/icons/google-icon.svg";

import { BASE_URL } from "url/url";


const StyledLogIn = styled.div`
  display: flex;
  height: 1117px;
  flex-direction: column;
  align-items: center;
  background: #def2f3;
  .logo {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .main {
    .as-a-student {
      padding-bottom: 41px;
    }
    padding: 0px 151px 57px 151px;
    padding-left: 151px;
    padding-right: 151px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    aspect-ratio: 1;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(42px);
    input.info {
      width: 100%;
      height: 49px;
      flex-shrink: 0;
      border-radius: 15px;
      background: #fff;
      border: 0;
      padding-left: 29px;
      margin-bottom: 44px;
    }
  }
  .remember-me-forgot-password {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 40px;
  }
  .or-sign-in {
    padding-top: 39px;
    padding-bottom: 32px;
  }
  .login-with-other-method {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .no-account {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .no-account #register-text {
    cursor: pointer;
  }
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddToAuth = (user, token) => {
    const credent = {
      user: user,
      accessToken: token,
    };
    dispatch(setCredentials(credent));
    navigate("/our-courses");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/auth/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed: Invalid credentials");
      }

      const data = await response.json();

      // Save the JWT token to local storage or a cookie
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", mail);

      console.log(data.token);

      handleAddToAuth(mail, data.token);
      // Redirect to the home/dashboard page after successful login
      // You can use React Router's history.push('/home') or similar
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <StyledLogIn>
        <img className="logo" src={KITSLogo} alt="" />
        <div className="main">
          <img className="logo" src={AsATutor} alt="" />
          <input
            className="info"
            type="text"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            className="info"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="remember-me-forgot-password">
            <div>
              <input type="checkbox" name="" id="" /> Remember me
            </div>
            <div>
              <a href="">Forgot Password</a>
            </div>
          </div>
          <Button
            width={"218px"}
            height={"69px"}
            borderRadius={"31px"}
            bgColor={"#0C4CA3"}
            onClick={(e) => handleLoginSubmit(e)}
          >
            Sign In
          </Button>
          <div className="or-sign-in">Or Sign In</div>
          <div className="login-with-other-method">
            <Button
              width={"218px"}
              height={"60px"}
              borderRadius={"39px"}
              bgColor={"#FFF"}
              textColor={"#898686"}
              fontSize={"16px"}
            >
              <img src={GoogleIcon} alt="" /> with Google
            </Button>
            <Button
              width={"218px"}
              height={"60px"}
              borderRadius={"39px"}
              boderColor={"#34BCAD"}
              bgColor={"rgba(255, 255, 255, 0.2)"}
              textColor={"#898686"}
              fontSize={"16px"}
            >
              <img src={FacebookIcon} alt="" /> with Facebook
            </Button>
          </div>
          <div className="no-account">
            Need an account? &nbsp;
            <Link to="/register">
              <div id="register-text"> Register</div>
            </Link>
          </div>
        </div>
      </StyledLogIn>
      {/* <input
        type="text"
        placeholder="mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button id="submit_button" onClick={(e) => handleLoginSubmit(e)}>
        Sign up
      </button>
      <br />
      <Link to="/register">
        <button id="register-button">Register</button>
      </Link> */}
    </div>
  );
};

export default LoginPage;
