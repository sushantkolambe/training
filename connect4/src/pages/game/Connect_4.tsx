import React, { useState } from 'react';
import './Connect_4.css';
import GamePlayerCard from '../../components/GamePlayerCard';
import Button from '../../components/Button';
import GameLayout from '../../components/gameLayout';

interface ButtonProps{
    player1Img: any; 
    player2Img: any;
    player1: string;
    player2: string;
}

function Connect_4({player1Img, player2Img, player1, player2}:ButtonProps){
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    return(
        <div className='gameApp'>
            
            <GameLayout score1={score1} setScore1={setScore1} score2={score2} setScore2={setScore2}/>
            
            <div className='right-half'>
                <h2 className='gamesTournament'>3 Games Tournament</h2>
                <p className='congratulation'>Congratulation!</p>
                <h3 className='playingGame'>Playing Game 1</h3>
                <div className='gamePlayers'>
                    <GamePlayerCard 
                        profileImg={player1Img}
                        playerNum={1}
                        background="#DCF6E4" 
                        playerName={player1}
                        score={score1}
                    />
                    <GamePlayerCard 
                        profileImg={player2Img}
                        playerNum={2}
                        background="#F7EFD5" 
                        playerName={player2}
                        score={score2}
                    />
                </div>
                <hr />
                <Button onClick={()=>{}} buttonText="Undo Step"/>
                <Button onClick={()=>{}} buttonText="End Tournament"/>
            </div>
        </div>
    );
}

export default Connect_4;