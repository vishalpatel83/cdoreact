import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { getToken } from "../../adalConfig.js";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/users/${id}`,
        header
      );
      // console.log("users", result);
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>User Profile</h1>
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
                defaultValue={
                  user.E_Id.FirstName === null ? "null" : user.E_Id.FirstName
                }
                disabled
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
                defaultValue={
                  user.E_Id.LastName === null ? "null" : user.E_Id.LastName
                }
                disabled
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Gender" className="col-form-label col-sm-3">
              Gender
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="text"
                id="Gender"
                name="Gender"
                defaultValue={
                  user.E_Id.Gender === null
                    ? "null"
                    : user.E_Id.Gender === true
                    ? "Male"
                    : "Female"
                }
                disabled
              />
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
                defaultValue={
                  user.E_Id.Email === null ? "null" : user.E_Id.Email
                }
                disabled
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
                type="text"
                id="Contact"
                name="Contact"
                defaultValue={
                  user.E_Id.Contact === null ? "null" : user.E_Id.Contact
                }
                disabled
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
                defaultValue={
                  user.E_Id.Address === null ? "null" : user.E_Id.Address
                }
                className="form-control"
                disabled
              ></textarea>
            </div>
          </div>
          <div>
            <Link
              to={`/users/profile/edit/${user.E_Id._id}`}
              className="btn btn-dark"
            >
              Edit
            </Link>
            <Link to="/" className="btn btn-dark ms-2">
              Back to Home
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
