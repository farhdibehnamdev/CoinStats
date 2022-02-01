import React from "react";
import FooterLayout from "components/layouts/footerLayout";
import MainRouter from "./routes";
export const DarkApp = () => {
  return (
    <React.Fragment>
      <MainRouter />
      <FooterLayout />
    </React.Fragment>
  );
};

export default DarkApp;
