import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProfileList from "../components/ProfileList";
import ProfileForm from "../components/ProfileForm";
import ProfileUpdate from "../components/ProfileUpdate";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<ProfileList />} />
          <Route path="profile-create" element={<ProfileForm />} />
          <Route path="profile-update/:id" element={<ProfileUpdate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

// npx json-server --watch db.json --port 3030