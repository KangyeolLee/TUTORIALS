import React from "react";
import TodoTemplates from "./components/TodoTemplates";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import { TodoContextProvider } from "./contexts/TodoContext";

const App = () => {
  return (
    <TodoContextProvider>
      <div className="App">
        <TodoTemplates>
          <TodoHeader />
          <TodoList />
          <TodoCreate />
        </TodoTemplates>
      </div>
    </TodoContextProvider>
  );
};

export default App;
