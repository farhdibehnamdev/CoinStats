import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export function UnexpectedError() {
  return (
    <React.Fragment>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Unexpected Error</h1>
          </div>
          <h1>We are sorry, Something went wrong.</h1>
          <Link to="/">Back To Homepage</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default UnexpectedError;
