import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Background from './components/Background';
import BackgroundForMobile from './components/BackgroundForMobile';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Background />
      <BackgroundForMobile />
      <Dashboard />
    </div>
  );
}

export default App;
