import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyContext from "../../store/MyContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../../adalConfig";

const CreateSubModule = () => {
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  const [modules, setModules] = useState([]);
  const [SM_Name, setSubmoduleName] = useState("");
  const [Route, setRoute] = useState("");
  const [ModuleName, setModuleName] = useState();
  const [is_Active, setIsActive] = useState(false);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const SubModule = {
      SM_Name: SM_Name,
      Route: Route,
      Module_Id: ModuleName,
      isActive: is_Active,
      Created_By: "Krunal",
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_API}/submodules/create`,
        SubModule,
        header
      )
      .then((res) => {
        context.myContextUpdate();
        navigate("/submodules", { state: { permission } });
      });
  };

  const fetchModules = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/modules`, header)
      .then((res) => setModules(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">SubModule Name</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={SM_Name}
              className="form-control"
              placeholder="Enter SubModule Name"
              onChange={(e) => setSubmoduleName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Route</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={Route}
              className="form-control"
              placeholder="Enter Route Without '/'"
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="modulename" className="col-sm-3 col-form-label">
            Module Name
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              aria-label="Default select example "
              value={ModuleName}
              onChange={(e) => setModuleName(e.target.value)}
            >
              <option>Open this select menu</option>
              {modules.map((module) => {
                return (
                  <option value={module._id} key={module._id}>
                    {module.Module_Name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="isActive" className=" col-form-label col-sm-3">
            Active
          </label>
          <div className="col-sm-4">
            <input
              type="checkbox"
              name="isActive"
              checked={is_Active}
              onChange={(e) => setIsActive(e.target.checked)}
              id="isActive"
              style={{ width: "20px" }}
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
          <Link
            to="/submodules"
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

export default CreateSubModule;
