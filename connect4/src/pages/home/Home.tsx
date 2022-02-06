import { useNavigate } from "react-router-dom";
import Connect_4 from '../game/Connect_4';
import './Home.css';
import HomePlayerCard from "../../components/HomePlayerCard";
import Button from '../../components/Button'

// let icon1 = require('../../img/male.png');
// let icon2 = require('../../img/female.png');

interface ButtonProps{
  player1:string;
  setPlayer1:any;
  player2:string;
  setPlayer2:any;
  player1Picture:string;
  player2Picture:string;
  setPlayer1Picture:any;
  setPlayer2Picture:any;
  setScore1:any;
  setScore2:any;
  setGameNumber:any;
}
function Home({player1, setPlayer1, player2, setPlayer2, player1Picture, player2Picture, setPlayer1Picture, setPlayer2Picture, setScore1, setScore2, setGameNumber}: ButtonProps){    
    
    const navigate = useNavigate();

    return (
        <div className="App">
          <HomePlayerCard 
            key={1}
            background="#DCF6E4"
            playerNum={1}
            player={player1}
            setPlayer={setPlayer1} 
            playerPicture={player1Picture}
            setPlayerPicture={setPlayer1Picture}         
          />
          <HomePlayerCard 
            key={2}
            background="#F7EFD5"
            playerNum={2}
            player={player2}
            setPlayer={setPlayer2} 
            playerPicture={player2Picture}
            setPlayerPicture={setPlayer2Picture}         
          />
          <hr />
          <Button buttonNum={0} buttonText="Start Game" onClick={()=>{
                navigate(`./Connect_4`)
                setScore1(0)
                setScore2(0)
                setGameNumber(1)
              }} 
          />
        </div>
      );
}

export default Home;