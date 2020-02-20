function add(){

	var myform = document.getElementById("Form1").getAttribute("id");

	var person = new Object();
	var form = document.getElementById(myform);

	person.name = form.elements[0].value;
	person.age = form.elements[1].value;

	if(ifEmpty(form)){
		var msg = "Required fields must not be empty.";
		document.getElementById("empty1").innerHTML = msg;
		document.getElementById("ageVal").innerHTML = "";

	}else{

		document.getElementById("empty1").innerHTML = "";
		//var Name = wholeNum(stocks);
		var age = ageVal(person.age);
		var name = nameVal(person.name);

		if(age !== "" || name !== ""){
			document.getElementById("ageVal").innerHTML = age;
			document.getElementById("nameVal2").innerHTML = name;
		}else{

			document.getElementById("ageVal").innerHTML = "";
			document.getElementById("nameVal2").innerHTML = "";

			var para = document.createElement("p");
			para.innerHTML = "name: " + person.name + ", age: " + person.age;
			document.getElementById("rdbleFmt").appendChild(para);

			var para = document.createElement("span");
			para.innerHTML = JSON.stringify(person) + " ";
			document.getElementById("fnlObj").appendChild(para);
		}

	}

}

var prod = [];
function addProducts(){

	var myform = document.getElementById("Form2").getAttribute("id");
	var form = document.getElementById(myform);

	if(ifEmpty(form)){ //if at least 1 field is found empty
		var msg = "Required fields must not be empty.";
		document.getElementById("empty").innerHTML = msg;
		document.getElementById("stockVal").innerHTML = "";
		document.getElementById("priceVal").innerHTML = "";
		document.getElementById("nameVal").innerHTML = "";

	}else{ //if there are no empty fields found

		document.getElementById("empty").innerHTML = ""; //resets the html text display under emtpy id

		var name = form.elements[0].value;
		var stocks = form.elements[1].value;
		var prices = form.elements[2].value;

		var resStocks = wholeNum(stocks);
		var resPrice = priceVal(prices);
		var resName = nameVal(name);

		if(resStocks !== "" || resPrice !== "" || resName !== ""){
			document.getElementById("stockVal").innerHTML = resStocks;
			document.getElementById("priceVal").innerHTML = resPrice;
			document.getElementById("nameVal").innerHTML = resName;
		}else{

			document.getElementById("stockVal").innerHTML = "";
			document.getElementById("priceVal").innerHTML = "";
			document.getElementById("nameVal").innerHTML = "";

			if((prod.length + 1) > 1){ //prod.length + 1, because first value was 0 and will execute the else below, need to filter the first input only
				if(prodNameExist(name)){
					document.getElementById("nameVal").innerHTML = "Product Name already exist.";
				}else{

					document.getElementById("nameVal").innerHTML = "";

					prod.push([name, stocks, prices]); //pushes the value from form fields into an array arranged constantly by Name, Stock and Price

					prodNameExist(name);

					var html = "Name: " + name + ", Stocks: " + stocks + ", Price: " + prices;
					addElement('prodList', 'p', html);
				}

			}else{

				document.getElementById("nameVal").innerHTML = "";

				prod.push([name, stocks, prices]); //pushes the value from form fields into an array arranged constantly by Name, Stock and Price

				prodNameExist(name);

				var html = "Name: " + name + ", Stocks: " + stocks + ", Price: " + prices;
				addElement('prodList', 'p', html);
			}
		}
	}
}

function calProd(){

	var totalVal = 0;
	var total = 0;
	var res = "";

	//calculates the total
	for(p in prod){ //prod values was assigned to addProducts() function
		total = parseInt(prod[p][1]) * parseFloat(prod[p][2]);
		totalVal += parseFloat(total);
		//conTotal.push(total);

		res += "<span>" + prod[p][0] + " will have a total value of " + total + "</span><br>";
	}

	if(totalVal == 0){

		roundTotalVal = '<span style="color:#f50404; font-weight:bold;">There is no product.</span>';

	}else{

		var roundTotalVal = "<strong>Total Value:</strong> " + totalVal.toFixed(2);

	}

	document.getElementById("total").innerHTML = res;
	document.getElementById("totalVal").innerHTML = roundTotalVal;
}

function addElement(parentId, elementTag, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function nameVal(val){

	var res = "";
	if(!isNaN(val)){
		res = "Name must not all in numeric characters."
	}else{
		res = "";
	}

	return res;
}

function wholeNum(val){

	var res = "";
	var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

	if(isNaN(val)){ // identifies if input is a number
		res += "Please enter a number.";
	}else{
		if(val % 1 !== 0 || format.test(val)){ // will not accept float and w/special character
			res += "Please enter a whole number.";
		}else if(val < 0){
			res += "Number must be greater than 0.";
		}else{
			res = "";
		}
	}

	return res;
}

function ageVal(val){

	var res = "";
	var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

	if(!isNaN(val)){ // identifies if input is a number

		if(val % 1 !== 0 || format.test(val)){ // will not accept float and w/special character
			res += "Please enter a whole number.";
		}else if(val < 0){
			res += "Aage must be greater than 0.";
		}else if(val == 0){
			res = "Age must not be 0";
		}else{
			res = "";
		}

	}else{ // not a number
		res += "Please enter a number.";
	}

	return res;
}

function priceVal(val){

	var res = "";
	var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

	if(isNaN(val)){ // identifies if input is not a number
		res += "Please enter a number.";
	}else{
		if(format.test(val)){ // will not accept w/ special character
			res += "Please enter a whole number.";
		}else if(val < 0){
			res += "Price must be greater than 0.";
		}else{
			res = "";
		}
	}

	return res;
}

function prodNameExist(val){

	var res = "";

	for(p in prod){
		if(val == prod[p][0]){
			res = true;
			break;
		}else{
			res = false;
		}
	}

	return res;
}

function ifEmpty(fld){
	var emp = "";

	for(var i = 0; i < fld.length-1; i++){ //loops the entire form fields and checks if there are empty values
		if(fld.elements[i].value === ""){
			emp = true; //at least 1 empty field is found
			break;
		}else{
			emp = false; // field is not empty
		}
	}
	return emp;
}