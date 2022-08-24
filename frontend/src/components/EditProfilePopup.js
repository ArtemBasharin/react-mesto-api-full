import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpened]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      submitButtonText="Сохранить"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        className="popup__input popup__input_type_name"
        id="name"
        type="text"
        name="name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-error" id="name-error"></span>
      <input
        required
        value={description || ""}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_employment"
        id="employment"
        type="text"
        name="employment"
        placeholder="Введите род деятельности"
        minLength="2"
        maxLength="200"
      />
      <span
        className="popup__input-error employment-error"
        id="employment-error"
      ></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
