import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(
    false
  );
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  ///
  useEffect(() => {
    if (!loggedIn) return;

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  ///
  useEffect(() => {
    if (!loggedIn) return;

    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  ///
  function handleLogin() {
    setLoggedIn(true);
  }

  ///
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((data) => {
          if (data) {
            setUserEmail(data.data.email);
            handleLogin();
            history.push("/");
            console.log(history);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  ///
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/");
  }

  ///
  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  ///
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  ///
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  ///
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  ///
  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setIsImagePopupOpened(false);
  }

  ///
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///
  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///
  function handleAddPlaceSubmit({ name, link }) {
    api
      .postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            email={userEmail}
            onSignOut={handleSignOut}
            loggedIn={loggedIn}
          />

          <Switch>
            {loggedIn && (
              <ProtectedRoute
                exact
                path="/"
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            )}
            <Route exact path={["/", "/sign-in"]}>
              <Login
                submitButtonText="Войти"
                title="Вход"
                handleLogin={handleLogin}
              />
            </Route>
            <Route exact path="/sign-up">
              <Register
                submitButtonText="Зарегистрироваться"
                title="Регистрация"
              />
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpened={isEditProfilePopupOpened}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpened={isAddPlacePopupOpened}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpened}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            submitButtonText="Да"
            isOpened={false}
            onClose={closeAllPopups}
          ></PopupWithForm>

          <ImagePopup
            isOpened={isImagePopupOpened}
            card={selectedCard}
            onClose={closeAllPopups}
          ></ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
