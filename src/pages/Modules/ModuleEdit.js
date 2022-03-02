import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MyContext from "../../store/MyContext";
import { getToken } from "../../adalConfig";

const ModuleEdit = (props) => {
  // console.log(props)
  let { id } = useParams();
  // const id = props.match.params.id;
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  const [moduleName, setmoduleName] = useState("");
  const [isActive, setisActive] = useState(false);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const moduleSubmithandler = (e) => {
    e.preventDefault();
    console.log(moduleName);
    console.log(isActive);
    const module = {
      Module_Name: moduleName,
      isActive: isActive,
      Updated_By: moduleName,
    };
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL_API}/modules/edit/${id}`,
        module,
        header
      )
      .then(() => {
        console.log("module updated succesfully");
        context.myContextUpdate();
        navigate("/modules", { state: { permission } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/modules/edit/${id}`, header)
      .then((res) => {
        console.log(res.data);
        setmoduleName(res.data.Module_Name);
        setisActive(res.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <form onSubmit={moduleSubmithandler}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Module Name</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={moduleName}
              className="form-control"
              onChange={(e) => setmoduleName(e.target.value)}
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
              checked={isActive}
            />
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-dark" type="submit">
            Update
          </button>
          <Link
            to="/modules"
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
export default ModuleEdit;
