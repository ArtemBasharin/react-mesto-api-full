import React from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          props.handleLogin();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <div className="auth__content">
        <h3 className="auth__title">{props.title}</h3>
        <form name="login" className="auth__form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleEmailChange}
            id="email-login"
            name="email"
            className="auth__input"
            type="email"
            placeholder="Email"
            minLength="6"
            maxLength="40"
            required
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            id="password-login"
            name="password"
            className="auth__input"
            type="password"
            placeholder="Password"
            minLength="6"
            maxLength="15"
            required
          />
          <button type="submit" className="auth__button">
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
