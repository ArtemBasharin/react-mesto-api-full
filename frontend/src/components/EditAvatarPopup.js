import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpened]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitButtonText="Сохранить"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        ref={inputRef}
        id="avatarLink"
        autoComplete="off"
        type="url"
        name="avatar"
        className="popup__input_link popup__input"
        placeholder="Ссылка на картинку"
      />
      <span
        className="popup__type-error avatarLink-error"
        id="avatarLink-error"
      >
        {" "}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
