import React from 'react';
import './App.css';

function App() {
  let prevY = 0;
  let prevX = 0;
  window.addEventListener("scroll", () => {
    if (prevY < window.scrollY) console.log("dowm");
    else if (prevY > window.scrollY) console.log("up");

    if(prevX < window.scrollX) console.log("right");
    else if(prevX > window.scrollX) console.log("left");

    prevY = window.scrollY;
    prevX = window.scrollX;
  });
  
  return (
    <div className="App">
    Open console and scroll
    </div>
  );
}

export default App;
