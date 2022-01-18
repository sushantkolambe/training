let body = document.body;
let dot1 = document.getElementById("dot-1");
let dot2 = document.getElementById("dot-2");
let dot3 = document.getElementById("dot-3");
let dot4 = document.getElementById("dot-4");
let dot5 = document.getElementById("dot-5");
let dots = [dot1, dot2, dot3, dot4, dot5];

let array = [];

for(let i=0; i<5; i++){
    let button = document.createElement("button");
    button.classList.add("all_buttons");
    button.innerHTML = `Button ${i+1}`;
    array.push(button);

    button.addEventListener('click', ()=>{alert(button.innerHTML)} );

}
console.log(array);


let slide = document.getElementById("slide");
let num = 0;
slide.appendChild(array[num]);
dots[num].style.backgroundColor = "red";

function previous(){
    if(num-1 < 0){
        num = array.length - 1;
        slide.appendChild(array[num]);
        dots[num].style.backgroundColor = "red";
        slide.removeChild(array[0]);
        dots[0].style.backgroundColor = "#bbb";
    }
    else{
        num--;
        slide.appendChild(array[num]);
        dots[num].style.backgroundColor = "red";
        slide.removeChild(array[num+1]);
        dots[num+1].style.backgroundColor = "#bbb";
    }
    // document.getElementsByClassName("all_buttons").style.animationDirection = "reverse";
}

function next(){
    if(num+1 >= array.length){
        num = 0;
        slide.appendChild(array[num]);
        dots[num].style.backgroundColor = "red";
        slide.removeChild(array[array.length-1]);
        dots[array.length-1].style.backgroundColor = "#bbb";
    }
    else{
        num++;
        slide.appendChild(array[num]);
        dots[num].style.backgroundColor = "red";
        slide.removeChild(array[num-1]);
        dots[num-1].style.backgroundColor = "#bbb";
    }
}
