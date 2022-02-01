interface ButtonProps{
    background:string; 
    icon:any;
    playerNum:number; 
    player:string;
    setPlayer:any;
}

function HomePlayerCard({background, icon, playerNum, player, setPlayer}: ButtonProps){
    return(
        <div className='player' style={{background: `${background}`}}>
            <input className="profileImg" type="file" src={icon} alt="" />
            <div className='inner-player'>
              <p>Player {playerNum}</p>
              <input onChange={(e)=>setPlayer(e.target.value)} value={player} type="text" />
            </div>  
        </div>
    );
}

export default HomePlayerCard;