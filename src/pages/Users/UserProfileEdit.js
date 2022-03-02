import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getToken } from "../../adalConfig.js";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const fetchEmployee = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/employees/edit/${id}`,
        header
      );
      // console.log("employee", result);
      setEmployee(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("new employee", employee);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL_API}/employees/edit/${employee._id}`,
        employee,
        header
      )
      .then((result) => {
        // console.log(result);
        alert("Profile Updated Successfully");
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <>
      {Object.keys(employee).length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>User Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="FirstName" className="col-sm-3 col-form-label">
                First Name
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control"
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={employee.FirstName === null ? "" : employee.FirstName}
                  onChange={(e) =>
                    setEmployee({ ...employee, FirstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="LastName" className="col-sm-3 col-form-label">
                Last Name
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control"
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={employee.LastName === null ? "" : employee.LastName}
                  onChange={(e) =>
                    setEmployee({ ...employee, LastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Gender" className="col-form-label col-sm-3">
                Gender
              </label>
              <div className="col-sm-1">
                <input
                  type="radio"
                  id="Male"
                  name="Gender"
                  value={true}
                  checked={employee.Gender === true}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      Gender: JSON.parse(e.target.value),
                    })
                  }
                />
                <label htmlFor="Male" className="col-form-label">
                  Male
                </label>
              </div>
              <div className="col-sm-1">
                <input
                  type="radio"
                  id="Female"
                  name="Gender"
                  value={false}
                  checked={employee.Gender === false}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      Gender: JSON.parse(e.target.value),
                    })
                  }
                />
                <label htmlFor="Female" className="col-form-label">
                  Female
                </label>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Email" className="col-sm-3 col-form-label">
                Email
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control"
                  type="email"
                  id="Email"
                  name="Email"
                  value={employee.Email === null ? "" : employee.Email}
                  onChange={(e) =>
                    setEmployee({ ...employee, Email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Contact" className="col-sm-3 col-form-label">
                Contact
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control"
                  type="number"
                  id="Contact"
                  name="Contact"
                  value={employee.Contact === null ? 0 : employee.Contact}
                  onChange={(e) =>
                    setEmployee({ ...employee, Contact: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Address" className="col-sm-3 col-form-label">
                Address
              </label>
              <div className="col-sm-4">
                <textarea
                  name="Address"
                  id="Address"
                  cols="30"
                  rows="2"
                  className="form-control"
                  value={employee.Address === null ? "" : employee.Address}
                  onChange={(e) =>
                    setEmployee({ ...employee, Address: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-dark">
                Update
              </button>
              <Link to="/" className="btn btn-dark ms-2">
                Back to Home
              </Link>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default UserProfile;
