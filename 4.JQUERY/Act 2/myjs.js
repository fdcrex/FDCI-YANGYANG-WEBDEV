var i = 0;
var errorMsg = "";

function longWord(){

	// ifEmpty(document.getElementById("words").value, document.getElementById("errorMsg1").getAttribute("id"));

	var text = document.getElementById("words").value.split(' '); //will return an array of words that was separated by space
	var wordLen = 0;
	var longestWord = "";

	for(i = 0; i < text.length; i++){
		if(text[i].length > wordLen){ 
			wordLen = text[i].length;
			longestWord = text[i];
	     }
	}
	
	document.getElementById("answerPart1").innerHTML = longestWord;
}

function primeOrNot(){

	/*var num = document.getElementById("number").value;
	ifEmpty(num, document.getElementById("errorMsg2").getAttribute("id"));*/


	if (isNaN(num)){

		errorMsg = "Please input a number.";
		document.getElementById("errorMsg2").innerHTML = errorMsg;

	}else{

		var res = "";
		if(num == 1){

			res = num + " is not a prime number";
			document.getElementById("answerPart2").innerHTML = res;
			document.getElementById("errorMsg2").innerHTML = "";

		}else if(num == 2){

			res = num + " is prime number";
			document.getElementById("answerPart2").innerHTML = res;
			document.getElementById("errorMsg2").innerHTML = "";

		}else{

			for(i = 2; i < num; i++){
				if(num % i == 0){
					res = num + " is not a prime number";
					break;
				}else{
					res = num + " is prime number";
				}
			}
			document.getElementById("answerPart2").innerHTML = res;
			document.getElementById("errorMsg2").innerHTML = "";
		}
	}
}

function convertMins(e){
	e.preventDefault();

	var num = document.getElementById("hour").value;
	if(num === ""){
		errorMsg = "This field can not be empty.";
		document.getElementById("errorMsg3").innerHTML = errorMsg;
		document.getElementById("answerPart3").innerHTML = "";
	}else{

		var mins = (num * 60) + " minutes";
		document.getElementById("answerPart3").innerHTML = mins;

		errorMsg = "";
		document.getElementById("errorMsg3").innerHTML = errorMsg;

		return false;
	}
}

function ifEmpty(val, con){
	if(val === ""){
		errorMsg = "This field can not be empty.";
		document.getElementById(con).innerHTML = errorMsg;
	}
}