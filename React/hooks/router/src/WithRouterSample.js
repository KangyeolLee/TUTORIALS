import React from "react";
import { withRouter } from "react-router-dom";

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        cols="30"
        rows="10"
        value={JSON.stringify(location, null, 2)}
        readOnly
      />

      <h4>match</h4>
      <textarea
        cols="30"
        rows="10"
        value={JSON.stringify(match, null, 2)}
        readOnly
      />

      <button onClick={() => history.push("/")}>Home</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
