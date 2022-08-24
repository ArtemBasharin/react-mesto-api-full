import React from "react";

function PopupWithForm(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popupAvatar popup_type_${props.name} ${
        props.isOpened && "popup_opened"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup__content popup__content_type_${props.name} popup__grid`}
      >
        <button
          type="button"
          className="button button_type_close button_type_close-profile popup__close"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          className={`popup__form popupAvatar__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button
            type="submit"
            className="button button_type_submit popup__submit-button"
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
