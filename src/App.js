import React from 'react';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <nav  className="z-depth-0 black " >
          <span className="brand-logo  center white-text container" >Currency Tracker</span>
      </nav>
   
        <Dashboard/>
    
      
    </div>
  );
}

export default App;
