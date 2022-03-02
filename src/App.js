import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ModuleIndex from "./pages/Modules/ModuleIndex";
import ModuleCreate from "./pages/Modules/ModuleCreate";
import ModuleEdit from "./pages/Modules/ModuleEdit";
import SubModuleIndex from "./pages/SubModules/SubModuleIndex";
import SubModuleCreate from "./pages/SubModules/SubModuleCreate";
import SubModuleEdit from "./pages/SubModules/SubModuleEdit";
import RoleIndex from "./pages/Roles/RoleIndex";
import RoleCreate from "./pages/Roles/RoleCreate";
import RoleEdit from "./pages/Roles/RoleEdit";
import RoleModuleIndex from "./pages/RoleModules/RoleModuleIndex";
import UserIndex from "./pages/Users/UserIndex";
import UserEdit from "./pages/Users/UserEdit";
import UserProfile from "./pages/Users/UserProfile";
import UserProfileEdit from "./pages/Users/UserProfileEdit";

const App = () => {
  return (
    <div>
      <div className="row">
        <Header />
      </div>
      <div className="d-flex f-row">
        <div style={{ width: "270px" }}>
          <Sidebar />
        </div>
        <div className="m-3" style={{ width: "1200px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/modules" element={<ModuleIndex />} />
            <Route path="/modules/create" element={<ModuleCreate />} />
            <Route path="/modules/edit/:id" element={<ModuleEdit />} />

            <Route path="/submodules" element={<SubModuleIndex />} />
            <Route path="/submodules/create" element={<SubModuleCreate />} />
            <Route path="/submodules/edit/:id" element={<SubModuleEdit />} />

            <Route path="/roles" element={<RoleIndex />} />
            <Route path="/roles/create" element={<RoleCreate />} />
            <Route path="/roles/edit/:id" element={<RoleEdit />} />

            <Route path="/rolemodules" element={<RoleModuleIndex />} />

            <Route path="/users" element={<UserIndex />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/users/profile/:id" element={<UserProfile />} />
            <Route
              path="/users/profile/edit/:id"
              element={<UserProfileEdit />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
