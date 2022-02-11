import './Connect_4.css';
import GamePlayerCard from '../../components/GamePlayerCard';
import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import { useReducer, useState } from 'react';
import { checkForWin, deepCloneBoard, generateNewBoard } from '../../GameLogic';

let gameInitiated = false;

const initialGameState = {
    player1: 1,
    player2: 2,
    currentPlayer: null,
    board: [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null]
           ],
    gameOver: false,
    message: '',
}
const gameReducer = (state:any, action:any) => {
    switch (action.type) {
      case 'newGame':
        return {
          ...initialGameState,
          board: action.board,
        }
      case 'togglePlayer':
        return {
          ...state,
          currentPlayer: action.nextPlayer,
          board: action.board,
        }
      case 'endGame':
        return {
          ...state,
          gameOver: true,
          message: action.message,
          board: action.board,
        }
      case 'updateMessage':
        return {
          ...state,
          message: action.message,
        }
      default:
        throw Error(`Action "${action.type}" is not a valid action.`)
    }
}

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
    
    const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState); 
    const [currentMoveRow, setCurrentMoveRow] = useState(0);
    const [currentMoveColumn, setCurrentMoveColumn] = useState(0);
    
    const [showCongratulation, setshowCongratulation] = useState(false);
    const [showNewGameButton, setshowNewGameButton] = useState(false);
    const [undoButtonPressed, setundoButtonPressed] = useState(false);
    const [Player1Class, setPlayer1Class] = useState('classForOrangeBorder');
    const [Player2Class, setPlayer2Class] = useState('');

    let board = deepCloneBoard(gameState.board);

    let result:any/*{playerWon: 1|2|'draw', winningCombination: Array<Array<number>>}*/= checkForWin(board) ;

    //triggered when clicked on circle
    const play = (c:number) => {
        if (!gameState.gameOver) {
            board = deepCloneBoard(gameState.board)
            //check if cell is taken by starting at the bottom row and working up
            for (let r = 7; r >= 0; r--) {
                if (!board[r][c]) {
                    board[r][c] = gameState.currentPlayer
                    setCurrentMoveRow(r);
                    setCurrentMoveColumn(c);
                    console.log(board)
                    break
                }
            }

            // Check status of board
            result = checkForWin(board);
            if (result?.playerWon === gameState.player1) {
                displayCongratulationAndButton();
                setScore1(score1 + 1);
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player1 (Green) wins!',
                    board,
                })
            } else if (result?.playerWon === gameState.player2) {
                displayCongratulationAndButton();
                setScore2(score2 + 1);
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player2 (Yellow) wins!',
                    board,
                })
            } else if (result?.playerWon === 'draw') {
                displayCongratulationAndButton();
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Draw Game!',
                    board,
                })
            } else {
                let currentPlayerUndo = gameState.currentPlayer;
                if(undoButtonPressed){
                    const nextPlayer = currentPlayerUndo;
                    profileImgBorder(nextPlayer);
                    dispatchGameState({ type: 'togglePlayer', nextPlayer, board });
                    setundoButtonPressed(false);
                }
                else{
                    const nextPlayer = gameState.currentPlayer === gameState.player1 ? gameState.player2 : gameState.player1;
                    profileImgBorder(nextPlayer);
                    dispatchGameState({ type: 'togglePlayer', nextPlayer, board });
                }
            }
        }
        // it's gameover and a user clicked a cell
        else {
            dispatchGameState({
                type: 'updateMessage',
                message: 'Game Over. Please start a new game.',
            })
        }
    }

    function profileImgBorder(nextPlayer:number){
        
        if(nextPlayer === 1 ){
            setPlayer1Class('classForOrangeBorder');
            setPlayer2Class('');
        }
        else if(nextPlayer === 2){
            setPlayer1Class('');
            setPlayer2Class('classForOrangeBorder');
        }
    }

    function displayCongratulationAndButton(){
        setshowCongratulation(true);
        setshowNewGameButton(true);
    }
    //REMOVE EVENT LISTENERS AND DOCUMENT.....================================================================
    //Start new game
        function newGameButtonHandler(){
            if(gameNumber < 4){
                dispatchGameState({ type: 'newGame', board: generateNewBoard() })
                setshowCongratulation(false);
                setshowNewGameButton(false);
            }
            else{
                score1>score2 ? alert(`Player 1 won please click on end tournament`) : (score2>score1 ? alert(`Player 2 won please click on end tournament`) : alert("Game Draw"));
                dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
            }
        };

        //UNDO
        function undoButtonHandler() {
            setundoButtonPressed(true);
            gameState.board[currentMoveRow][currentMoveColumn] = null;
        }

    console.log(gameState.message);

    //Start the game
    function initiateGame(){
        if(gameInitiated === false){
            gameInitiated = true;
            dispatchGameState({ type: 'newGame', board: generateNewBoard()})
        }
    }
    

//  ============================================================================================================================================================   
    const navigate = useNavigate();

    return(
        <div className='gameApp'>
            {initiateGame()}
            <div className="left-half">
                {initialGameState.board.map((d,rowIndex)=> {
                        return initialGameState.board[rowIndex].map((value, colIndex)=>{
                            const showRing = result?.winningCombination.filter((d:Array<number>) => d[0]===rowIndex && d[1]===colIndex).length > 0;
                            
                            return <div 
                                        id={`${rowIndex}${colIndex}`} 
                                        onClick={()=>{console.log({rowIndex, colIndex});  play(colIndex); }} 
                                        key={`${rowIndex}${colIndex}`} 
                                        className={`CirclesWhite ${showRing ? 'winningCombinationRing' : '' }`}
                                    >
                                        {board[rowIndex][colIndex]===1 ? 
                                            <img 
                                            id={`img${rowIndex}${colIndex}`} 
                                            style={{height: '44px', width: '44px', borderRadius: '50%', border: '3px solid #75fc9d'}} 
                                            src={player1Img} 
                                            alt="" 
                                            /> : 
                                        (board[rowIndex][colIndex]===2 ? 
                                            <img 
                                            id={`img${rowIndex}${colIndex}`} 
                                            style={{height: '44px', width: '44px', borderRadius: '50%', border: '3px solid #f5d878'}} 
                                            src={player2Img} 
                                            alt="" 
                                            />: 
                                        null)
                                        }
                                        {/* {rowIndex} {value} {colIndex}  */}
                                </div>
                            })
                        }
                    )}
            </div>
            
            <div className='right-half'>
                <h2 className='gamesTournament'>3 Games Tournament</h2>
                {showCongratulation ? <p id='congratulation' className='congratulation'>Congratulation!</p> : <p>Game is going on</p>}
                { !gameState.gameOver && <h3 className='playingGame'>Playing Game {gameNumber}</h3> }
                { gameState.gameOver && <h3 className='playingGame'>{gameState.message}</h3> }
                <div className='gamePlayers'>
                    <GamePlayerCard 
                        profileImg={player1Img}
                        playerNum={1}
                        background="#DCF6E4" 
                        playerName={player1}
                        score={score1}
                        classForBorder={Player1Class}
                    />
                    
                    <GamePlayerCard 
                        profileImg={player2Img}
                        playerNum={2}
                        background="#F7EFD5" 
                        playerName={player2}
                        score={score2}
                        classForBorder={Player2Class}
                    />
                </div>
                <hr />
                { showNewGameButton && <Button buttonNum={1} onClick={newGameButtonHandler} buttonText='New Game'/> }
                { !showNewGameButton && <Button buttonNum={2} onClick={undoButtonHandler} buttonText="Undo Step"/>}
                <Button buttonNum={3} onClick={()=>{navigate(`/`)}} buttonText="End Tournament"/>
            </div>
        </div>
    );
}

export default Connect_4;