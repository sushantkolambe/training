import { useReducer, useState } from 'react';
import { checkForWin, deepCloneBoard, generateNewBoard } from '../GameLogic';
interface ButtonProps{
    score1:number;
    setScore1:any;
    score2:number;
    setScore2:any;
}
let gameInitiated = false;
// const board = useState([]);
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
function GameLayout({score1, setScore1, score2, setScore2}:ButtonProps){

    const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState); 
    
    
    //triggered when clicked on circle
    const play = (c:number) => {
        if (!gameState.gameOver) {
            let board = deepCloneBoard(gameState.board)
            //check if cell is taken by starting at the bottom row and working up
            for (let r = 7; r >= 0; r--) {
                if (!board[r][c]) {
                    board[r][c] = gameState.currentPlayer
                    changeColor(`${r}${c}`, gameState.currentPlayer);
                    console.log(board)
                    break
                }
            }

            // Check status of board
            let result = checkForWin(board)
            if (result === gameState.player1) {
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player1 (red) wins!',
                    board,
                })
            } else if (result === gameState.player2) {
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player2 (black) wins!',
                    board,
                })
            } else if (result === 'draw') {
                dispatchGameState({
                    type: 'endGame',
                    message: 'Draw Game!',
                    board,
                })
            } else {
                const nextPlayer = gameState.currentPlayer === gameState.player1 ? gameState.player2 : gameState.player1;

                dispatchGameState({ type: 'togglePlayer', nextPlayer, board });
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

    function changeColor(id:any, value:any){
        const element = document.getElementById(id);
        console.log(id,value);
        if(value==1) {element!.style.backgroundColor = 'Red';}
        else if(value==2) {element!.style.backgroundColor = 'Blue';}
    }

    console.log(gameState.message);

    function initiateGame(){
        gameInitiated = true;
        dispatchGameState({ type: 'newGame', board: generateNewBoard()})
    }
    return(
        <div className="left-half">
            {gameInitiated ? initiateGame() : null}
            {initialGameState.board.map((d,rowIndex)=> {
                    return initialGameState.board[rowIndex].map((value, colIndex)=>{
                        
                        // let color='CirclesWhite';
                        // if(value===1) {color='CirclesRed'}
                        // else if(value===2) {color='CirclesBlue'}

                        return <div id={`${rowIndex}${colIndex}`} onClick={()=>{console.log({rowIndex, colIndex});  play(colIndex); /*changeColor(`${rowIndex}${colIndex}`, value);*/ }} key={`${rowIndex}${colIndex}`} className="CirclesWhite">
                                    {rowIndex} {value} {colIndex}
                               </div>
                        })
                    }
                )}
        </div>
    );
}

export default GameLayout;