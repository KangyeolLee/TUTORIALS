import React from "react";
import qs from "qs";

const About = ({ location }) => {
  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(query);
  const detail = query.detail === "true";

  return (
    <div>
      <h1>ABOUT</h1>
      <p>this page for ABOUT Intro</p>
      {detail && <p>additional information...</p>}
    </div>
  );
};

export default About;
