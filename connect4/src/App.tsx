import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Connect_4 from './pages/game/Connect_4';
import Home from './pages/home/Home';

let img1 = require('./img/male.png');
let img2 = require('./img/female.png');

function App() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [player1Picture, setPlayer1Picture] = useState<string>(img1);
  const [player2Picture, setPlayer2Picture] = useState<string>(img2);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameNumber, setGameNumber] = useState(1);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home 
                                        player1Picture={player1Picture} 
                                        setPlayer1Picture={setPlayer1Picture} 
                                        player2Picture={player2Picture} 
                                        setPlayer2Picture={setPlayer2Picture} 
                                        player1={player1} 
                                        setPlayer1={setPlayer1} 
                                        player2={player2} 
                                        setPlayer2={setPlayer2} 
                                        setScore1={setScore1}
                                        setScore2={setScore2}
                                        setGameNumber={setGameNumber}
                                    />} 
            />
          <Route path="/Connect_4" element={<Connect_4 
                                                player1Img={player1Picture} 
                                                player2Img={player2Picture} 
                                                player1={player1} 
                                                player2={player2} 
                                                score1={score1}
                                                score2={score2}
                                                setScore1={setScore1}
                                                setScore2={setScore2}
                                                gameNumber={gameNumber}
                                                setGameNumber={setGameNumber}
                                            />} 
            />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
