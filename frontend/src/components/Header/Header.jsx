import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/user/userSlice";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        pledge
      </Link>
      <ul className="header__list">
        {user ? (
          <button className="btn btn-logout" onClick={handleLogout} to="/login">
            Logout
          </button>
        ) : (
          <>
            <Link className="header__item" to="/login">
              Login
            </Link>
            <Link className="header__item" to="/register">
              Register
            </Link>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
