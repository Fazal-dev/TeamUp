import React from "react";
import { Outlet } from "react-router-dom";

const DefoultLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefoultLayout;
