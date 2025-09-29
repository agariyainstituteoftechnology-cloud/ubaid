
var amount = +prompt("Enter the amount:");

var n5000 = Math.floor(amount / 5000);
amount = amount % 5000;

var n1000 = Math.floor(amount / 1000);                 
amount = amount%1000;

var n500 = Math.floor(amount / 500);
amount = amount % 500;

if(n5000 >  0){
    console.log("5000: "+ n5000);
}
if(n1000 >  0){
    console.log("1000: "+ n1000);
}
if(n500 >  0){
    console.log("500: " + n500);
}

