import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MyContext from "../../store/MyContext";
import axios from "axios";
import { getToken } from "../../adalConfig";

const CreateRole = () => {
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  const [Role_Name, setroleleName] = useState("");
  const [is_Active, setIsActive] = useState(false);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Role = {
      RoleName: Role_Name,
      isActive: is_Active,
      Created_By: "Krunal",
    };
    console.log(Role);

    axios
      .post(`${process.env.REACT_APP_BASE_URL_API}/roles/create`, Role, header)
      .then((res) => {
        context.myContextUpdate();
        navigate("/roles", { state: { permission } });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="Module_Name" className="col-sm-3 col-form-label">
            Module Name
          </label>
          <div className="col-sm-4">
            <input
              className="form-control"
              onChange={(e) => setroleleName(e.target.value)}
              type="text"
              id="Module_Name"
              name="Module_Name"
              value={Role_Name}
              placeholder="Enter Role"
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
              onChange={(e) => setIsActive(e.target.checked)}
              name="isActive"
              value={is_Active}
              id="isActive"
              checked={is_Active}
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-dark" type="submit" value="Create">
            Submit
          </button>
          <Link
            to="/roles"
            state={{ permission: permission }}
            className="btn btn-dark ms-2"
          >
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateRole;
