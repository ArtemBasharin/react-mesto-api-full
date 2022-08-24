import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoToolTip from "./InfoToolTip";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoToolTipOpened(true);
        } else {
          setIsSuccess(false);
          setIsInfoToolTipOpened(true);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolTipOpened(true);
        console.log(err);
      });
  }

  function closeInfoToolTip() {
    setIsInfoToolTipOpened(false);
    if (isSuccess) {
      history.push("/sign-in");
    }
  }

  return (
    <div className="auth">
      <div className="auth__content">
        <h3 className="auth__title">{props.title}</h3>
        <form name="register" className="auth__form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleEmailChange}
            id="email-register"
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
            id="password-register"
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
        <div className="auth__sign">
          <p className="auth__text">Уже зарегистрированы? &nbsp;</p>
          <Link to="/sign-in" className="auth__link button">
            Войти
          </Link>
        </div>
      </div>
      <InfoToolTip
        name="infoToolTip"
        isOpened={isInfoToolTipOpened}
        onClose={closeInfoToolTip}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default Register;
