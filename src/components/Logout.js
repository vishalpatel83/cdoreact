import { Link } from "react-router-dom";
import { authContext } from "../adalConfig";
const Logout = () => {
  return (
    <Link className="dropdown-item" to="#" onClick={() => authContext.logOut()}>
      Logout
    </Link>
  );
};
export default Logout;
