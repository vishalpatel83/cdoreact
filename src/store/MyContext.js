import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { getToken, getUser } from "../adalConfig";

const MyContext = createContext({});

export const MyContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [updateMyContext, setUpdateMyContext] = useState(0);

  const header = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const createEmployee = async (userData) => {
    try {
      const employee = {
        FirstName: userData.profile.given_name,
        LastName: userData.profile.family_name,
      };
      const emp = await axios.post(
        `${process.env.REACT_APP_BASE_URL_API}/employees/create`,
        employee,
        header
      );
      // console.log("employee created", emp);
      createUser(userData, emp.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (userData, emp_id) => {
    try {
      const user = {
        AD_Id: userData.profile.oid,
        AD_Email: userData.userName,
        E_Id: emp_id,
      };
      const createdUser = await axios.post(
        `${process.env.REACT_APP_BASE_URL_API}/users/create`,
        user,
        header
      );
      // console.log("User Created Successfully", createdUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async (getUser) => {
    try {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/users`,
        header
      );
      setUsers(allUsers.data);
      const user = getUser();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/userdetails/${user.profile.oid}`,
        header
      );
      // console.log("userDetails", userDetails.data);
      setUserDetails(userDetails.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const userExists = (AD_Email) => {
    return users.some((user) => {
      return user.AD_Email === AD_Email;
    });
  };

  useEffect(() => {
    getAllUsers(getUser);
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      // console.log(user.userName, userExists(user.userName));
      if (!userExists(user.userName)) {
        createEmployee(user);
      }
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      fetchUserDetails();
    }
  }, [user, updateMyContext]);

  const myContextUpdate = () => {
    setUpdateMyContext(updateMyContext + 1);
  };

  const context = {
    userDetails: userDetails,
    myContextUpdate: myContextUpdate,
  };
  console.log("MyContext rendered");

  return (
    <MyContext.Provider value={context}>{props.children}</MyContext.Provider>
  );
};
export default MyContext;
