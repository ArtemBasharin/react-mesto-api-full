import React from "react";
import Card from "./Card.js";
import addButtonIcon from "../images/plus-icon.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="person">
        <div className="person__section">
          <div className="person__avatarSection">
            <button
              type="button"
              className="person__button-updateAvatar"
              onClick={props.onEditAvatar}
            ></button>
            <img
              className="person__image"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
          </div>
          <div className="person__description">
            <div className="person__subsection">
              <h1 className="person__name">{currentUser.name}</h1>
              <button
                className="person__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="person__employment">{currentUser.about}</p>
          </div>
        </div>
        <button className="add-button" onClick={props.onAddPlace}>
          <img
            className="add-button__icon"
            src={addButtonIcon}
            alt="Добавить"
          />
        </button>
      </section>

      <section className="cards">
        {props.cards.map((card) => {
          return (
            <Card
              cardData={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
