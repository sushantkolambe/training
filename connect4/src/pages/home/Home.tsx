import { useNavigate } from "react-router-dom";
import Connect_4 from '../game/Connect_4';
import './Home.css';
import HomePlayerCard from "../../components/HomePlayerCard";
import Button from '../../components/Button'

let icon1 = require('../../img/male.png');
let icon2 = require('../../img/female.png');

interface ButtonProps{
  player1:string;
  setPlayer1:any;
  player2:string;
  setPlayer2:any;
}
function Home({player1, setPlayer1, player2, setPlayer2}: ButtonProps){    

    const navigate = useNavigate();

    return (
        <div className="App">
          <HomePlayerCard 
            background="#DCF6E4" 
            icon={icon1} 
            playerNum={1} 
            player={player1} 
            setPlayer={setPlayer1} 
          />
          <HomePlayerCard 
            background="#F7EFD5" 
            icon={icon2} 
            playerNum={2} 
            player={player2} 
            setPlayer={setPlayer2} 
          />
          <hr />
          <Button buttonText="Start Game" onClick={()=>navigate(`./Connect_4`)} />
        </div>
      );
}

export default Home;