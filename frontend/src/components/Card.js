import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.cardData.owner === currentUser._id;
  
  const cardDeleteButtonClassName = `card__trash-button ${
    isOwn ? "" : "card__trash-button_hidden"
  }`;
  const isLiked = props.cardData.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_black" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.cardData.link}
        alt={props.cardData.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__subsection">
        <h2 className="card__description">{props.cardData.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="card__likesCounter">{props.cardData.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
