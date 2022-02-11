interface ButtonProps{
    background:string; 
    playerNum:number; 
    player:string;
    setPlayer:any;
    playerPicture:string;
    setPlayerPicture:any;
}

function HomePlayerCard({background, playerNum, player, setPlayer, playerPicture, setPlayerPicture}: ButtonProps){
    function loadfile(event:any){
	    let fileURL = URL.createObjectURL(event.target.files[0]);
        console.log(fileURL)
        setPlayerPicture(fileURL);
    }
    return(
        <div className='player' style={{background: `${background}`}}>
            <div className="imgContainer">
                <input onChange={loadfile} className="profileImgInput" type="file" id={`file${playerNum}`} alt="" capture="user" accept="image/*"/>
                <label htmlFor={`file${playerNum}`}>
                    <img className="profileImg" src={playerPicture} alt="" />
                </label>
                <div id="output"></div>
            </div>
            <div className='inner-player'>
              <p>Player {playerNum}</p>
              <input onChange={(e)=>setPlayer(e.target.value)} value={player} placeholder='Enter Name' type="text" />
            </div>  
        </div>
    );
}

export default HomePlayerCard;