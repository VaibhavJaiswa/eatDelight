import React from 'react';
import './App.css';
import RestaurantOverview from './component/RestaurantOverview';
import Home from './component/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Filter from './component/Filter';
import FuncFilter from './component/FuncFilter';
import { CookiesProvider } from 'react-cookie';

/** Author : Vaibhav Jaiswal */

function App() {
  return (
      <div> 
        <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/details/:rName" element={<RestaurantOverview />}></Route>
          <Route path="/filter/:mType" element={<FuncFilter />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<div>No Route Found</div>}></Route>
        </Routes>
      </Router>
      </CookiesProvider>   
    </div>

  );
}

export default App;
