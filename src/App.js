import logo from './logo.svg';
import './App.css';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3"
import Pie from './Pie';
import Bar from './Bar';
import ActionLink from './Draw/ActionLink';
import Inputs from './Inputs/Inputs';

function App() {

  return (
    <div className="App">
      <Inputs />
    </div>
  );
}

export default App;