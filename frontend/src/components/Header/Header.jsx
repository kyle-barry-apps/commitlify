import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        pledge
      </Link>
      <ul className="header__list">
        <Link className="header__item" to="/login">
          Login
        </Link>
        <Link className="header__item" to="/register">
          Register
        </Link>
      </ul>
    </header>
  );
};

export default Header;
