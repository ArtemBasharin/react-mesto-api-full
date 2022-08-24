import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &#169;{new Date().getFullYear()} Yandex.Praktikum, Artem Basharin
      </p>
    </footer>
  );
}

export default Footer;
