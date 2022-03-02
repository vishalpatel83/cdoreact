import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import MyContext from "../../store/MyContext";
import axios from "axios";
import { getToken } from "../../adalConfig";

const RoleEdit = (props) => {
  console.log(props);
  let { id } = useParams();
  console.log(id);
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  // const id = props.match.params.id;
  const [roleName, setroleName] = useState("");
  const [isActive, setisActive] = useState(false);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const roleSubmithandler = (e) => {
    e.preventDefault();
    console.log(roleName);
    console.log(isActive);
    const role = {
      RoleName: roleName,
      isActive: isActive,
      Updated_By: roleName,
    };
    console.log(role);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL_API}/roles/edit/${id}`,
        role,
        header
      )
      .then((res) => {
        // console.log("roleupdated succesfully");
        // console.log(res);
        context.myContextUpdate();
        navigate("/roles", { state: { permission } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/roles/edit/${id}`, header)
      .then((res) => {
        console.log(res.data);
        setroleName(res.data.RoleName);
        setisActive(res.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <form onSubmit={roleSubmithandler}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Role Name</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={roleName}
              className="form-control"
              onChange={(e) => setroleName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="isActive" className="control-labe col-sm-3">
            Active
          </label>
          <div className="col-sm-4">
            <input
              type="checkbox"
              value={isActive}
              onChange={(e) => setisActive(e.target.checked)}
              checked={isActive === true ? "checked" : ""}
            />
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-dark" type="submit">
            Update
          </button>
          <Link to="/roles" state={{ permission: permission }} className="btn btn-dark ms-2">
            Back to Home
          </Link>
        </div>
      </form>
    </>
  );
};
export default RoleEdit;
