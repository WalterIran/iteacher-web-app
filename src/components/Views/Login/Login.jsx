import React, { useState, useContext } from "react";
import "./Login.css";
import { PrimaryButton } from "../../UI/Form/Button/Button";
import { PrimaryInput } from "../../UI/Form/Input/Input";
import AuthContext from "../../../context/AuthProvider";
import { publicAxios } from "../../../Lib/apiClient";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = "/api/v1/auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  let navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await publicAxios.post(LOGIN_URL, {
        email: email,
        password: password,
      });

      setAuth({ ...response.data });
      localStorage.setItem("user",JSON.stringify({...response.data}));
      setEmail('')
      setPassword('')
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <div className="outer-div">
          <div className="img-div">
            <img
              src={
                "https://raw.githubusercontent.com/WalterIran/iteacher-web-app/main/public/app-logo.png"
              }
              width="200"
              height="200"
            />
          </div>
          <div className="inner-div">
            <div className="input-email">
              <PrimaryInput
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="EMAIL"
              />
            </div>
            <div className="input-pass">
              <PrimaryInput
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="PASSWORD"
              />
            </div>
            <div className="button-login">
              <PrimaryButton style={{ width: "200px" }} onClick={handleSubmit}>
                Log In
              </PrimaryButton>
            </div>
            <div className="button-signin">
              <PrimaryButton style={{ width: "200px" }} onClick={() => navigate('/register-options')}>Sign Up</PrimaryButton>
            </div>
          </div>
        </div>
    </>
  );
};

export default Login;
