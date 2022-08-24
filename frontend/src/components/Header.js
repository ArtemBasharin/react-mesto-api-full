import React from "react";
import logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__image" src={logo} alt="Лого сайта Место" />

      <Switch>
        {props.loggedIn ? (
          <Route exact path="/">
            <div className="header__info">
              <p className="header__mail">{props.email}</p>
              <button
                className="header__link header__link-sign-out button"
                onClick={props.onSignOut}
              >
                Выйти
              </button>
            </div>
          </Route>        
        ) : (
          <Route exact path={["/", "/sign-in"]}>
            <Link to="/sign-up" className="header__link button">
              Регистрация
            </Link>
          </Route>
        )}
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link button">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
