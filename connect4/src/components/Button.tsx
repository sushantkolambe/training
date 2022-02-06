import './Button.css';
interface ButtonProps{
    buttonNum:number
    onClick:()=>void;
    buttonText:string;
}
function Button({buttonNum, onClick, buttonText}:ButtonProps){
    return (
        <button id={`button${buttonNum}`} onClick={onClick}>{buttonText}</button>
    );
}

export default Button;