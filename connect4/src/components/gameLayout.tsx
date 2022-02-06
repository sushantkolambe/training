import { createElement, useReducer, useState } from 'react';
import { checkForWin, deepCloneBoard, generateNewBoard } from '../GameLogic';

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
    score1: number;
    setScore1: any;
    score2: number;
    setScore2: any;
    gameNumber: number;
    setGameNumber: any;
}
function GameLayout({player1Img, player2Img, score1, setScore1, score2, setScore2, gameNumber, setGameNumber}:ButtonProps){

    const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState); 
    const [currentMoveRow, setCurrentMoveRow] = useState(0);
    const [currentMoveColumn, setCurrentMoveColumn] = useState(0);
    
    let undoPressed = false;
    let board = deepCloneBoard(gameState.board);
    //triggered when clicked on circle
    const play = (c:number) => {
        if (!gameState.gameOver) {
            board = deepCloneBoard(gameState.board)
            //check if cell is taken by starting at the bottom row and working up
            for (let r = 7; r >= 0; r--) {
                if (!board[r][c]) {
                    board[r][c] = gameState.currentPlayer
                    changeColor(`${r}${c}`, gameState.currentPlayer);
                    setCurrentMoveRow(r);
                    setCurrentMoveColumn(c);
                    console.log(board)
                    break
                }
            }

            // Check status of board
            let result = checkForWin(board)
            if (result === gameState.player1) {
                displayCongratulationAndButton();
                setScore1(score1 + 1);
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player1 (Green) wins!',
                    board,
                })
            } else if (result === gameState.player2) {
                displayCongratulationAndButton();
                setScore2(score2 + 1);
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Player2 (Yellow) wins!',
                    board,
                })
            } else if (result === 'draw') {
                displayCongratulationAndButton();
                gameNumber < 4 ? setGameNumber(gameNumber+1) : dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
                dispatchGameState({
                    type: 'endGame',
                    message: 'Draw Game!',
                    board,
                })
            } else {
                let currentPlayerUndo = gameState.currentPlayer;
                if(undoPressed){
                    const nextPlayer = currentPlayerUndo;
                    profileImgBorder(nextPlayer);
                    dispatchGameState({ type: 'togglePlayer', nextPlayer, board });
                    undoPressed = false;
                    console.log(`undo button ${undoPressed}`)
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
        if(nextPlayer == 1){
            document.getElementById(`profileImg${nextPlayer}`)!.style.border = '10px solid #FFA201';
            document.getElementById(`profileImg2`)!.style.border = 'white';
        }
        else if(nextPlayer == 2){
            document.getElementById(`profileImg1`)!.style.border = 'white';
            document.getElementById(`profileImg${nextPlayer}`)!.style.border = '10px solid #FFA201';
        }
    }

    function displayCongratulationAndButton(){
        // console.log('displayCongratulationAndButton() called');
        const congratulation = document.getElementById('congratulation');
        congratulation!.style.display = "initial";
        
        document.getElementById('button1')!.style.display = "initial";
    }
    //REMOVE EVENT LISTENERS AND DOCUMENT.....================================================================
    //Start new game
    document.addEventListener("DOMContentLoaded", ()=>{
        const newGameButton = document.getElementById('button1') as HTMLButtonElement;
        newGameButton.onclick = ()=>{
            if(gameNumber < 4){
                clearBoard();
                dispatchGameState({ type: 'newGame', board: generateNewBoard() })
                document.getElementById('congratulation')!.style.display = "none";
                document.getElementById('button1')!.style.display = "none";
            }
            else{
                score1>score2 ? alert(`Player 1 won`) : (score2>score1 ? alert(`Player 2 won`) : alert("Game Draw"));
                dispatchGameState({type: 'updateMessage', message: 'Game Tournament Over'});
            }
        };

        //UNDO
        const undoButton = document.getElementById('button2') as HTMLButtonElement
        undoButton.onclick = () => {
            undoPressed = true;
            board[currentMoveRow][currentMoveColumn] = null;
            const image = document.getElementById(`img${currentMoveRow}${currentMoveColumn}`) as HTMLImageElement;
            image.setAttribute('src','');
            image.style.border = "none";
            image.style.display = "none";
        }
    });

    function clearBoard(){
        for(let i=0; i<=7; i++){
            for(let j=0; j<=7; j++){
                const image = document.getElementById(`img${i}${j}`) as HTMLImageElement;
                image.setAttribute('src','');
                image.style.border = "none";
                image.style.display = "none";
                // console.log(`img${i}${j}`);
            }
        }
    }

    //Change color of circles from white
    function changeColor(id:any, value:any){
        const element = document.getElementById(id);
        // console.log(id,value);
        const imgElement = document.getElementById(`img${id}`) as HTMLImageElement;
        imgElement.style.display = 'initial';
        if(value==1) { 
            imgElement.setAttribute('src',player1Img);
            imgElement.style.border = '4px solid #75fc9d';
        }
        else if(value==2) { 
            imgElement.setAttribute('src',player2Img);
            imgElement.style.border = '4px solid #f5d878';
        }
        else {
            element!.style.backgroundColor = 'White'; 
            imgElement.style.display = 'none';
        }
    }

    console.log(gameState.message);

    //Start the game
    function initiateGame(){
        if(gameInitiated == false){
            gameInitiated = true;
            dispatchGameState({ type: 'newGame', board: generateNewBoard()})
        }
    }
    return(
        <div className="left-half">
            {initiateGame()}
            {initialGameState.board.map((d,rowIndex)=> {
                    return initialGameState.board[rowIndex].map((value, colIndex)=>{

                        return <div id={`${rowIndex}${colIndex}`} onClick={()=>{console.log({rowIndex, colIndex});  play(colIndex); }} key={`${rowIndex}${colIndex}`} className="CirclesWhite">
                                    <img id={`img${rowIndex}${colIndex}`} style={{height: '45px', width: '45px', borderRadius: '50%', display: 'none'}} src='' alt="" />
                                    {/* {rowIndex} {value} {colIndex}  */}
                               </div>
                        })
                    }
                )}
        </div>
    );
}

export default GameLayout;