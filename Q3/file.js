let first_name = document.getElementById("first_name").value;
let middle_name = document.getElementById("middle_name").value;
let last_name = document.getElementById("last_name").value;
let select = document.getElementById("marital_status");
let spouse_name = document.getElementById("spouse_name").value;
let errors = document.getElementById("errors");
let form = document.getElementsByTagName("form");
let terms = document.getElementById("terms");

first_name.focus();

function check_status(){
    let marrital_status = document.getElementById("marital_status").selectedIndex;
    if(document.getElementsByTagName("option")[marrital_status].value == 'married'){
        document.getElementById("spouse_name").removeAttribute('readonly');
    }
    select.style.backgroundColor = "hsla(100, 90%, 70%, 1)";
    select.style.outline = "none"; 
}

function validate(){
    if(first_name.indexOf(' ') >= 0){
        alert("Please remove spaces from first name");
    }
    else if(middle_name.indexOf(' ') >= 0){
        alert("Please remove spaces from middle name");
    }
    else if(last_name.indexOf(' ') >= 0){
        alert("Please remove spaces from last name");
    }
    else if(spouse_name.indexOf(' ') >= 0){
        alert("Please remove spaces from spouse name");
    }
    else if(!terms.checked){
        alert("Please accept terms & conditions");
    }
}

function submitted(){
    alert("Thank You");
}