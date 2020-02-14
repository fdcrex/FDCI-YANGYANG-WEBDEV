var i = 0;
var errorMsg = "";

function longWord(){

	var str = document.getElementById("words").value;
	var con = document.getElementById("errorMsg1").getAttribute("id");
	var ans = document.getElementById("answerPart1").getAttribute("id");

	var text = str.split(' '); //will return an array of words that was separated by space
	var wordLen = 0;
	var longestWord = "";

	if(ifEmpty(str)){
		exe(con, ans);
	}else{

		for(i = 0; i < text.length; i++){
			if(text[i].length > wordLen){ 
				wordLen = text[i].length;
				longestWord = text[i];
		     }
		}
	
		document.getElementById(ans).innerHTML = longestWord;
		document.getElementById(con).innerHTML = "";
	}
}

function primeOrNot(){

	var num = document.getElementById("number").value;
	var con = document.getElementById("errorMsg2").getAttribute("id");
	var ans = document.getElementById("answerPart2").getAttribute("id");

	if(ifEmpty(num)){
		exe(con, ans);
	}else{

		if (isNaN(num)){

			errorMsg = "Please input a number.";
			document.getElementById(con).innerHTML = errorMsg;

		}else{

			var res = "";
			if(num == 1){

				res = num + " is not a prime number";
				document.getElementById(ans).innerHTML = res;
				document.getElementById(con).innerHTML = "";

			}else if(num == 2){

				res = num + " is prime number";
				document.getElementById(ans).innerHTML = res;
				document.getElementById(con).innerHTML = "";

			}else{

				for(i = 2; i < num; i++){
					if(num % i == 0){
						res = num + " is not a prime number";
						break;
					}else{
						res = num + " is prime number";
					}
				}
				document.getElementById(ans).innerHTML = res;
				document.getElementById(con).innerHTML = "";
			}
		}
	}
}

function convertMins(e){
	e.preventDefault();

	var num = document.getElementById("hour").value;
	var con = document.getElementById("errorMsg3").getAttribute("id");
	var ans = document.getElementById("answerPart3").getAttribute("id");

	if(ifEmpty(num)){
		exe(con, ans);
	}else{

		var mins = (num * 60) + " minutes";
		document.getElementById(ans).innerHTML = mins;
		document.getElementById(con).innerHTML = "";

		return false;
	}
}

function ifEmpty(val){
	if(val === ""){
		return true;
	}else{
		return false;
	}
}

function exe(con, ans){
	errorMsg = "This field can not be empty.";

	document.getElementById(con).innerHTML = errorMsg;
	document.getElementById(ans).innerHTML = "";
}