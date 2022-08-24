import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpened]);

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      submitButtonText="Создать"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        value={name || ""}
        onChange={handleNameChange}
        id="place"
        autoComplete="off"
        type="text"
        name="name"
        className="cardPopup__input cardPopup__input_type_name cardPopup__input_type_cardname popup__input"
        placeholder="Введите название"
        minLength="2"
        maxLength="30"
      />
      <span className="cardPopup__input-error place-error" id="place-error">
        {" "}
      </span>
      <input
        value={link || ""}
        onChange={handleLinkChange}
        id="link"
        autoComplete="off"
        type="url"
        name="link"
        className="ardPopup__input cardPopup__input_type_link popup__input"
        placeholder="Введите url картинки"
        required
      />
      <span className="cardPopup__input-error link-error" id="link-error">
        {" "}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
