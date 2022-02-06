import './Connect_4.css';
import GamePlayerCard from '../../components/GamePlayerCard';
import Button from '../../components/Button';
import GameLayout from '../../components/gameLayout';
import {useNavigate} from 'react-router-dom';

interface ButtonProps{
    player1Img: any; 
    player2Img: any;
    player1: string;
    player2: string;
    score1:number;
    score2:number;
    setScore1:any;
    setScore2:any;
    gameNumber:number;
    setGameNumber:any;
}

function Connect_4({player1Img, player2Img, player1, player2, score1, score2, setScore1, setScore2, gameNumber, setGameNumber}:ButtonProps){
    
    const navigate = useNavigate();

    return(
        <div className='gameApp'>

            <GameLayout 
                player1Img={player1Img} 
                player2Img={player2Img} 
                score1={score1} 
                setScore1={setScore1} 
                score2={score2} 
                setScore2={setScore2}
                gameNumber={gameNumber}
                setGameNumber={setGameNumber}
            />
            
            <div className='right-half'>
                <h2 className='gamesTournament'>3 Games Tournament</h2>
                <p id='congratulation' className='congratulation'>Congratulation!</p>
                <h3 className='playingGame'>Playing Game {gameNumber}</h3>
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
                <Button buttonNum={1} onClick={()=>{}} buttonText='New Game'/>
                <Button buttonNum={2} onClick={()=>{}} buttonText="Undo Step"/>
                <Button buttonNum={3} onClick={()=>{navigate(`/`)}} buttonText="End Tournament"/>
            </div>
        </div>
    );
}

export default Connect_4;