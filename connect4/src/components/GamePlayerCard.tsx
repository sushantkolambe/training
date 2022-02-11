interface ButtonProps{
    profileImg:any
    playerNum:number
    background:string
    playerName:any
    score:number
    classForBorder:string
}
function GamePlayerCard({
    profileImg, 
    playerNum, 
    background, 
    playerName, 
    score, 
    classForBorder
}:ButtonProps){
    return(
        <div className='playersCard' style={{background: `${background}`}} >
            <img 
                id={`profileImg${playerNum}`} 
                className={classForBorder} 
                src={profileImg} 
                alt=''/>
            <div>
                <p>Player {playerNum}</p>
                <p>{playerName}</p>
            </div>
            <div>
                <p>Score</p>
                <p>{score}</p>
            </div>
        </div>
    );
}

export default GamePlayerCard;