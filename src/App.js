import React from 'react';
import './App.css';
import RangeSlider from './components/RangeSlider'

function App() {
  return (
    <div className="container">
      <div className="text-center"><h1>S&P Returns</h1></div>
      <RangeSlider />
    </div>
  );
}

export default App;
