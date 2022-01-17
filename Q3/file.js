let first_name = document.getElementById("first_name");
let middle_name = document.getElementById("middle_name");
let last_name = document.getElementById("last_name");
let select = document.getElementById("marital_status");
let spouse_name = document.getElementById("spouse_name");
let errors = document.getElementById("errors");
let form = document.getElementsByTagName("form");
let terms = document.getElementById("terms");
let married = false;

function check_status(){
    let marrital_status = document.getElementById("marital_status").selectedIndex;
    if(document.getElementsByTagName("option")[marrital_status].value == 'married'){
        document.getElementById("spouse_name").removeAttribute('readonly');
        married = true;
    }
    select.style.backgroundColor = "hsla(100, 90%, 70%, 1)";
    select.style.outline = "none"; 
}

function validate(){
    if(first_name.value.includes(' ') || first_name.value.length <= 0){
        first_name.value.includes(' ') ? alert("Please remove spaces from first name") : alert("Please enter first name");
        first_name.focus();
    }
    else if(middle_name.value.includes(' ') || middle_name.value.length <= 0){
        middle_name.value.includes(' ') ? alert("Please remove spaces from middle name") : alert("Please enter middle name");
        middle_name.focus();
    }
    else if(last_name.value.includes(' ') || last_name.value.length <= 0){
        last_name.value.includes(' ') ? alert("Please remove spaces from last name") : alert("Please enter last name");
        last_name.focus();
    }
    else if(spouse_name.value.includes(' ') || (spouse_name.value.length <= 0 && married)){
        first_name.includes(' ') ? alert("Please remove spaces from spouse name") : alert("Please enter spouse name");
        spouse_name.focus();
    }
    else if(!terms.checked){
        alert("Please accept terms & conditions");
    }
    else{
        alert("Thank You");
    }
}