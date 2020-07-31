import React from "react";
import Users from "./Users";
import { UserContextProvider } from "./UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <Users />
      </div>
    </UserContextProvider>
  );
};

export default App;
