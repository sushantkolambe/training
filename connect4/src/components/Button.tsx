import './Button.css';
interface ButtonProps{
    onClick:()=>void;
    buttonText:string;
}
function Button({onClick, buttonText}:ButtonProps){
    return (
        <button onClick={onClick}>{buttonText}</button>
    );
}

export default Button;