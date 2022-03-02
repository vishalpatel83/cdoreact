import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { getToken } from "../../adalConfig";
import MyContext from "../../store/MyContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  let navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [Email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [roles, setroles] = useState([]);
  const [roleName, setroleName] = useState("");
  const [roleId, setroleId] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const getEmployee = async () => {
    const employeeData = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users/edit/${id}`,
      header
    );
    console.log("employess", employeeData.data);
    setfirstName(employeeData.data.E_Id.FirstName);
    setlastName(employeeData.data.E_Id.LastName);
    setgender(employeeData.data.E_Id.Gender);
    setEmail(employeeData.data.E_Id.Email);
    setaddress(employeeData.data.E_Id.Address);
    setemployeeId(employeeData.data.E_Id._id);
    setcontact(employeeData.data.E_Id.Contact);
    setroleName(employeeData.data.Role_Id.RoleName);
    setroleId(employeeData.data.Role_Id._id);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    updateEmployee();
    updateUser();

    // console.log(employeedata);
  };
  const updateEmployee = async () => {
    const employeedata = {
      FirstName: firstName,
      LastName: lastName,
      Gender: gender,
      Email: Email,
      Address: address,
      Contact: contact,
    };
    console.log("data", employeedata);
    const updateemploye = await axios.put(
      `${process.env.REACT_APP_BASE_URL_API}/employees/edit/${employeeId}`,
      employeedata,
      header
    );
    console.log("updated", updateemploye);
    console.log(roleId);
    context.myContextUpdate();
    navigate("/users", { state: { permission } });
  };
  const updateUser = async () => {
    const userData = {
      Role_Id: roleId,
    };
    const user = await axios.put(
      `${process.env.REACT_APP_BASE_URL_API}/users/edit/${id}`,
      userData,
      header
    );
  };
  const getRoles = async () => {
    const allRoles = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/roles`,
      header
    );
    setroles(allRoles.data);
  };

  useEffect(() => {
    getEmployee();
    getRoles();
  }, []);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">firstName</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={firstName === null ? "" : firstName}
              className="form-control"
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">LastName</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={lastName === null ? "" : lastName}
              className="form-control"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">UserRole</label>
          <div className="col-sm-4">
            <select
              className="form-select"
              id="role"
              value={roleId === null ? "" : roleId}
              onChange={(e) => setroleId(e.target.value)}
            >
              {roles.map((role) => {
                return (
                  <option value={role._id} key={role._id}>
                    {role.RoleName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Gender</label>

          <div className="col-sm-4">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio1"
                name="inlineRadioOptions"
                value={true}
                checked={gender === true}
                onChange={(e) => setgender(JSON.parse(e.target.value))}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                name="inlineRadioOptions"
                checked={gender === false}
                value={false}
                onChange={(e) => setgender(JSON.parse(e.target.value))}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={Email === null ? "" : Email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">contact</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={contact === null ? "" : contact}
              onChange={(e) => setcontact(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Address</label>
          <div className="col-sm-4">
            <input
              type="text"
              value={address === null ? "" : address}
              onChange={(e) => setaddress(e.target.value)}
              className="form-control"
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
    </div>
  );
};
export default UserEdit;
