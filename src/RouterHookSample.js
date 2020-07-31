import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

const RouterHookSample = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  console.log({ history, location, match });
  return null;
};

export default RouterHookSample;
