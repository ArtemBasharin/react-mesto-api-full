import React from "react";

function ImagePopup(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup show-image ${props.isOpened ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="show-image__container">
        <button
          className="popup__close show-image__close"
          onClick={props.onClose}
        ></button>
        <div className="show-image__image-container">
          <img
            className="show-image__img"
            src={props.card.link}
            alt={props.card.name}
          />
          <p className="show-image__subscription">{props.card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
