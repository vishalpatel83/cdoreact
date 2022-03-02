import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const UserIndex = () => {
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
  const [users, setUsers] = useState([]);
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/users`, header)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("are you sure?")) {
      axios.delete(`${process.env.REACT_APP_BASE_URL_API}/users/${id}`, header);
      alert("Deleted Successfully");
      fetchUsers();
      context.myContextUpdate();
      navigate("/users", { state: { permission } });
    } else {
      context.myContextUpdate();
      navigate("/users", { state: { permission } });
    }
  };
  return (
    <div>
      {users.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>User Table</h1>
          <TableContainer component={Paper} className="mt-3">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">First Name</StyledTableCell>
                  <StyledTableCell align="center">Last Name</StyledTableCell>
                  <StyledTableCell align="center">Gender</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Contact</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.FirstName === null
                        ? "null"
                        : user.E_Id.FirstName}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.LastName === null
                        ? "null"
                        : user.E_Id.LastName}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.Gender === null
                        ? "null"
                        : user.E_Id.Gender === true
                        ? "Male"
                        : "Female"}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.Email === null ? "null" : user.E_Id.Email}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.Contact === null ? "null" : user.E_Id.Contact}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      {user.E_Id.Address === null ? "null" : user.E_Id.Address}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link
                        to={`/users/edit/${user._id}`}
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
                        onClick={(e) => handleDelete(e, user.E_Id.toString())}
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

export default UserIndex;
