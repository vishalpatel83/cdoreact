import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import MyContext from "../store/MyContext.js";

const Sidebar = () => {
  const context = useContext(MyContext);
  console.log(context.userDetails);

  const checkRoute = (route) => {
    if (route.charAt(0) === "/") {
      return route.slice(1);
    }
    return route;
  };
  return (
    <div style={{ height: "700px" }}>
      <ProSidebar>
        <Menu>
          {Object.keys(context.userDetails).length === 0
            ? ""
            : context.userDetails.Modules.map((module) => {
                return (
                  <SubMenu key={module._id} title={module.Module_Name}>
                    {context.userDetails.Rolemodules.map((rolemodule) => {
                      return (
                        (rolemodule.View || rolemodule.Edit) &&
                        rolemodule.Module_Id === module._id && (
                          <MenuItem key={rolemodule._id}>
                            <NavLink
                              to={`/${checkRoute(rolemodule.Route)}`}
                              state={{ permission: rolemodule }}
                              className="nav-link"
                              style={({ isActive }) => ({
                                color: isActive
                                  ? "#fff"
                                  : "rgba(255,255,255,.55)",
                              })}
                            >
                              {rolemodule.SubModule_Name}
                            </NavLink>
                          </MenuItem>
                        )
                      );
                    })}
                  </SubMenu>
                );
              })}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
