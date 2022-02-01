import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Connect_4 from './pages/game/Connect_4';
import Home from './pages/home/Home';

let img1 = require('./img/male.png');
let img2 = require('./img/female.png');

function App() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home player1={player1} setPlayer1={setPlayer1} player2={player2} setPlayer2={setPlayer2} />} />
          <Route path="/Connect_4" element={<Connect_4 player1Img={img1} player2Img={img2} player1={player1} player2={player2} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
