import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../adalConfig";
import Logout from "./Logout";

const UserData = () => {
  const [userName, setUserName] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserName(user.userName);
      setId(user.profile.oid);
    }
  }, []);

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <Link
          className="nav-link"
          to="#"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {userName}
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <Link className="dropdown-item" to={`users/profile/${id}`}>
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </li>
    </ul>
  );
};
export default UserData;
