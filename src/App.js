import React from "react";
import "./App.css";
import FooterLayout from "./components/layouts/footerLayout";
import MainRouter from "./routes";
function App() {
  return (
    <React.Fragment>
      <div>
        <MainRouter />
        <FooterLayout />
      </div>
    </React.Fragment>
  );
}

export default App;
