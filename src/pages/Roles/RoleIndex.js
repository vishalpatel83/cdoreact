import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

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

const RoleIndex = () => {
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
  const disableDelete =
    permission !== null && permission.Delete === true ? true : false;
  const [roles, setRoles] = useState([]);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const fetchRoles = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/roles`, header)
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = (e, id) => {
    if (window.confirm("are you sure?")) {
      axios.delete(`${process.env.REACT_APP_BASE_URL_API}/roles/${id}`, header);
      alert("Deleted Successfully");
      fetchRoles();
      context.myContextUpdate();
      navigate("/roles", { state: { permission } });
    } else {
      context.myContextUpdate();
      navigate("/roles", { state: { permission } });
    }
  };

  return (
    <div>
      {roles.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Role Table</h1>
          {disableCreate && (
            <Link
              className="btn btn-dark float-end mb-3"
              to="/roles/create"
              state={{ permission: permission }}
            >
              Create
            </Link>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Role Name</StyledTableCell>
                  <StyledTableCell align="center">Is Active</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <StyledTableRow key={role._id}>
                    <StyledTableCell component="th" scope="row">
                      {role.RoleName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <input
                        type="checkbox"
                        checked={role.isActive === true ? "checked" : ""}
                        disabled
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                        to={`/roles/edit/${role._id}`}
                        state={{ permission: permission }}
                        style={!disableEdit ? { pointerEvents: "none" } : null}
                      >
                        <MdOutlineModeEditOutline
                          style={{
                            fontSize: "24px",
                            color: disableEdit ? "black" : "grey",
                          }}
                        />
                      </Link>{" "}
                      |{" "}
                      <Link
                        to="#"
                        state={{ permission: permission }}
                        style={
                          !disableDelete ? { pointerEvents: "none" } : null
                        }
                        onClick={(e) => handleDelete(e, role._id.toString())}
                      >
                        <RiDeleteBin5Line
                          style={{
                            fontSize: "24px",
                            color: disableDelete ? "black" : "grey",
                          }}
                        />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default RoleIndex;
