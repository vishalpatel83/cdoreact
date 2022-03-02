import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../../adalConfig";
import MyContext from "../../store/MyContext";

const SubModuleEdit = () => {
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  let { id } = useParams();
  const [subModulename, setsubModulename] = useState("");
  const [route, setRoute] = useState("");
  const [moduleId, setmoduleId] = useState("");
  const [isActive, setisActive] = useState(false);
  const [moduleName, setmoduleName] = useState("");
  const [allModule, setallModule] = useState([]);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_API}/submodules/edit/${id}`,
        header
      )
      .then((res) => {
        setsubModulename(res.data.SM_Name);
        // console.log("Route", res.data.Route);
        if (res.data.Route) {
          setRoute(res.data.Route);
        } else {
          setRoute("");
        }
        // console.log(res.data.Module_Id._id);
        setmoduleName(res.data.Module_Id.Module_Name);
        setmoduleId(res.data.Module_Id._id);
        setisActive(res.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/modules`, header)
      .then((res) => {
        //  console.log(res.data)
        setallModule(res.data);
      });
  }, []);
  // console.log(allModule)
  // console.log(moduleId);
  const subModuleSubmitHandler = (e) => {
    e.preventDefault();
    const submodule = {
      SM_Name: subModulename,
      Route: route,
      isActive: isActive,
      Module_Id: moduleId,
      Updated_By: "krunal",
    };
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL_API}/submodules/edit/${id}`,
        submodule,
        header
      )
      .then((res) => {
        console.log("submoduleupdated successfully");
        navigate("/submodules", { state: { permission } });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(submodule);
  };

  return (
    <>
      <form onSubmit={subModuleSubmitHandler}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">SubModule Name</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={subModulename}
              className="form-control"
              onChange={(e) => setsubModulename(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Route</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={route}
              className="form-control"
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
              aria-label="Default select example"
              value={moduleId}
              onChange={(e) => setmoduleId(e.target.value)}
            >
              {allModule.map((m) => {
                return (
                  <option
                    key={m._id}
                    value={m._id}
                    // selected={m._id === moduleId ? "selected" : ""}
                  >
                    {m.Module_Name}
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
              checked={isActive}
              onChange={(e) => setisActive(e.target.checked)}
              id="isActive"
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-dark" type="submit">
            Update
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
    </>
  );
};

export default SubModuleEdit;
