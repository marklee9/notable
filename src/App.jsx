import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/app.css';

// Components
import homeComponent from './components/home_component';

function App() {
  return (
    <Router>
      <Route path="/" exact component={homeComponent}></Route>
    </Router>
  );
}

export default App;
