import React from "react";
import CounterContainer from "./containers/CounterContainer";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <div className="App">
      <CounterContainer />
      <Route path="/" exact component={PostListPage} />
      <Route path="/:id" component={PostPage} />
    </div>
  );
};

export default App;
