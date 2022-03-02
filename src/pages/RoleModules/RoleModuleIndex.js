import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../adalConfig";
import MyContext from "../../store/MyContext";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RoleModuleIndex = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  let permission = null;
  if (location.state !== null) {
    permission = location.state.permission;
  }
  console.log("permission", permission);
  const disableCreate =
    permission !== null && permission.Add === true ? true : false;
  const disableEdit =
    permission !== null && permission.Edit === true ? true : false;
  console.log("Edit Permission", disableEdit);
  const disableDelete =
    permission !== null && permission.Delete === true ? true : false;
  const [rolemodules, setRoleModules] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState();
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState();
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const fetchRoleModules = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/rolemodules`, header)
      .then((res) => {
        setRoleModules(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRoles = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/roles`, header)
      .then((res) => setRoles(res.data))
      .catch((error) => console.log(error));
  };

  const fetchModules = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/modules`, header)
      .then((res) => setModules(res.data))
      .catch((error) => console.log(error));
  };

  const fetchRoleModulesByRoleIdAndModuleId = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/rolemodules/roleandmodule/${roleId}/${moduleId}`,
        header
      );
      if (result.data.length === 0) {
        alert("Date Not Found");
      } else {
        setRoleModules(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleModulesByRoleId = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/rolemodules/role/${roleId}`,
        header
      );
      setRoleModules(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleModulesByModuleId = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/rolemodules/module/${moduleId}`,
        header
      );
      setRoleModules(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoleModules();
    fetchRoles();
    fetchModules();
  }, []);

  const handleView = (e, roleId, moduleId, subModuleId) => {
    setRoleModules(
      rolemodules.map((rolemodule) =>
        (rolemodule.Role_Id._id.toString() === roleId) &
        (rolemodule.Module_Id._id.toString() === moduleId) &
        (rolemodule.SubModule_Id._id.toString() === subModuleId)
          ? { ...rolemodule, View: e.target.checked }
          : rolemodule
      )
    );
  };
  const handleEdit = (e, roleId, moduleId, subModuleId) => {
    setRoleModules(
      rolemodules.map((rolemodule) =>
        (rolemodule.Role_Id._id.toString() === roleId) &
        (rolemodule.Module_Id._id.toString() === moduleId) &
        (rolemodule.SubModule_Id._id.toString() === subModuleId)
          ? { ...rolemodule, Edit: e.target.checked }
          : rolemodule
      )
    );
  };
  const handleAdd = (e, roleId, moduleId, subModuleId) => {
    setRoleModules(
      rolemodules.map((rolemodule) =>
        (rolemodule.Role_Id._id.toString() === roleId) &
        (rolemodule.Module_Id._id.toString() === moduleId) &
        (rolemodule.SubModule_Id._id.toString() === subModuleId)
          ? { ...rolemodule, Add: e.target.checked }
          : rolemodule
      )
    );
  };
  const handleDelete = (e, roleId, moduleId, subModuleId) => {
    setRoleModules(
      rolemodules.map((rolemodule) =>
        (rolemodule.Role_Id._id.toString() === roleId) &
        (rolemodule.Module_Id._id.toString() === moduleId) &
        (rolemodule.SubModule_Id._id.toString() === subModuleId)
          ? { ...rolemodule, Delete: e.target.checked }
          : rolemodule
      )
    );
  };
  const handleSearch = () => {
    if (roleId && moduleId) {
      // console.log(roleId, moduleId);
      fetchRoleModulesByRoleIdAndModuleId();
    } else if (roleId) {
      // console.log(roleId);
      fetchRoleModulesByRoleId();
    } else if (moduleId) {
      // console.log(moduleId);
      fetchRoleModulesByModuleId();
    } else {
      // console.log("not selected");
      alert("Please select Role or Module");
    }
  };
  const handleClear = () => {
    fetchRoleModules();
    context.myContextUpdate();
    navigate("/rolemodules", { state: { permission } });
  };

  const roleModuleSubmit = async () => {
    await rolemodules.forEach((rolemodule) => {
      axios
        .put(
          `${
            process.env.REACT_APP_BASE_URL_API
          }/rolemodules/edit/${rolemodule._id.toString()}`,
          rolemodule,
          header
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    alert("Data Updated Successfully");
    context.myContextUpdate();
    navigate("/rolemodules", { state: { permission } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    roleModuleSubmit();
  };

  return (
    <div>
      {rolemodules.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Role Module Table</h1>
          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="role">Roles</label>
              <select
                className="form-select"
                id="role"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option>Open this select menu</option>
                {roles.map((role) => {
                  return (
                    <option
                      value={role._id}
                      key={role._id}
                      name={role.RoleName}
                    >
                      {role.RoleName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-4">
              <label htmlFor="module">Modules</label>
              <select
                className="form-select"
                id="module"
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
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
            <div className="col-sm-4 mt-auto">
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
              <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Role Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Module Name
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      SubModule Name
                    </StyledTableCell>
                    <StyledTableCell align="center">View</StyledTableCell>
                    <StyledTableCell align="center">Add</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rolemodules.map((rolemodule, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {rolemodule.Role_Id.RoleName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {rolemodule.Module_Id.Module_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {rolemodule.SubModule_Id.SM_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="checkbox"
                          value={rolemodule.View}
                          checked={rolemodule.View === true ? "checked" : ""}
                          onChange={(e) =>
                            handleView(
                              e,
                              rolemodule.Role_Id._id.toString(),
                              rolemodule.Module_Id._id.toString(),
                              rolemodule.SubModule_Id._id.toString()
                            )
                          }
                          disabled={!disableEdit}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="checkbox"
                          value={rolemodule.Add}
                          checked={rolemodule.Add === true ? "checked" : ""}
                          onChange={(e) =>
                            handleAdd(
                              e,
                              rolemodule.Role_Id._id.toString(),
                              rolemodule.Module_Id._id.toString(),
                              rolemodule.SubModule_Id._id.toString()
                            )
                          }
                          disabled={!disableEdit}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="checkbox"
                          value={rolemodule.Edit}
                          checked={rolemodule.Edit === true ? "checked" : ""}
                          onChange={(e) =>
                            handleEdit(
                              e,
                              rolemodule.Role_Id._id.toString(),
                              rolemodule.Module_Id._id.toString(),
                              rolemodule.SubModule_Id._id.toString()
                            )
                          }
                          disabled={!disableEdit}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          type="checkbox"
                          value={rolemodule.Delete}
                          checked={rolemodule.Delete === true ? "checked" : ""}
                          onChange={(e) =>
                            handleDelete(
                              e,
                              rolemodule.Role_Id._id.toString(),
                              rolemodule.Module_Id._id.toString(),
                              rolemodule.SubModule_Id._id.toString()
                            )
                          }
                          disabled={!disableEdit}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {disableEdit && (
              <div className="mt-3">
                <button className="btn btn-dark" type="submit">
                  Submit
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default RoleModuleIndex;
