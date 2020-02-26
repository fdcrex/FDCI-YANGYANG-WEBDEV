var i = 0;
var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
var errorMsg = "";

function formValidate(){
	var a = document.getElementById("myForm");
	var form = new Array(); //Stored in this sequence: Name, Gender MoreInfo
	var hobbies = new Array(); //hobbies are stored differently since they can be 1 or more in values
	var input = a.getElementsByTagName('input');

	for(var i = 0; i < a.length; i++){ //stores all inputs to from variable in an array
		var n = a.elements[i].getAttribute("name");
		if(n == "Add_Hobby" || n == "Submit"){ //button is not included
			continue;
		}else if(n == "Hobbies" && a.elements[i].checked){ //checkboxes is selected
			hobbies.push(a.elements[i].value);
		}else if(n == "Hobbies" && !a.elements[i].checked){//unchecked checkboxes is not included
			continue;
		}else{
			form.push(a.elements[i].value); //other fields are stored differently
		}
	}

	var name = form[0].trim(); 
	var gender = form[1];
	var moreInfo = form[2];
	
	if(isEmpty(name) || gender == 0 || isEmpty(moreInfo) || hobbies.length == 0){ //if empty

		errorMsg = "Required fields are empty.";
		document.getElementById("ifEmpty").innerHTML = errorMsg;
		document.getElementById("valName").innerHTML = "";
		document.getElementById("valHobbies").innerHTML = "";

	}else{ //fields are not empty

		document.getElementById("ifEmpty").innerHTML = errorMsg;
		var nameRes = nameVal(name); //nameval() validates if the name field has a valid value
		var hobRes = hobbiesVal(hobbies); //hobbiesVal() validates if hobbies is less than 3

		if(nameRes.length > 0 || hobRes.length > 0){ //another set of validatioin for name and hobbies

			document.getElementById("ifEmpty").innerHTML = "";
			document.getElementById("valName").innerHTML = nameRes;
			document.getElementById("valHobbies").innerHTML = hobRes;

		}else{ //if validations are successful, should return the following format
			var html = '<hr>';
			html += '<p>Hi my name is ' + name +'.</p>';
			if(gender == 1){
				gender = "Male";
			}else{
				gender = "Female";
			}
			html += '<p>Your gender is ' + gender + '.</p>';
			html += '<p>Your hobbies are: </p>';
			html += '<ul>';
			for(var x in hobbies){
				html += '<li>' + hobbies[x] + '</li>';
			}
			html += '</ul>';
			html += '<p>About yourself: ' + moreInfo + '</p>';

			document.getElementById("part1").setAttribute("class", "hide"); //will hide part 1 if it enteres this condition
			document.getElementById("part2").setAttribute("class", "show"); //part 2 was hidden by default
			document.getElementById("part2").innerHTML = html;
		}
	}

}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

function nameVal(val){ //name will allow [-] and [.] and basis is on format variable

	var format = /[!@#$%^&*()_+\=\[\]{};':"\\|,<>\/?]/;
	var res = "";

	if(!isNaN(val)){ //will identify if the input is a number
		res = "Name must not all in numeric characters.";
	}else if(format.test(val)){ //will return the message below if special characters in var format is present
		res = "Special characters are not allowed except for ' - ' and ' . '";
	}else if(val == "-" || val == "." || val == "-." || val == ".-"){ //manually added validation for these characters since have excluded them in var format since a name can have . or -
		res = "Name must not contain only these ' - .' ";
	}else if(stringHasInt(val)){ //identifies of a string has an int value
		res = "Name must not be in alpha numeric character.";
	}else{ // will return blank if none of the conditions are met
		res = "";
	}

	return res;

}

function stringHasInt(str){ // determine if a string contains a numberf
	var strlen = str.length;
	var num = false;

	for(var i = 0; i < strlen; i++){
		if(Number.isInteger(parseInt(str[i]))){ //used parseInt() function to check its numeric value
			num = true;
			break;
		}
	}
	return num;
}

function hobbiesVal(hob){
	var res = "";
	if(hob.length < 3){
		res = "Please choose at least 3 hobbies.";
	}
	return res;
}

function characterCount(){
	var a = document.getElementById("moreInfo");
	var alen = a.value.length;

 	if(parseInt(alen) >= 21){//will display only up until 20 character in count
 		document.querySelector("#count span").removeAttribute("id");
 	}else{
 		document.querySelector("#count span").setAttribute("id", "charCount"); 
 		document.getElementById("charCount").innerHTML = alen; //used .innerHTML to make it real time counting
 	}

}

function addHobby(){
	var html = '<input type="text" name="newhob" id="newHobFld" placeholder="Please input new hobby here"> <br> <button type="button" id="saveHobBtn" name="SaveHobby" onclick="saveHobby()">Save</button>';
	document.getElementById("hobfunc").innerHTML = html; //replaced add hobby button to save button
	document.getElementById("submit").disabled = true; //disabled submit button to prevent user sending info, this also prevents submit button validating newHobFld field. THis field must have a separate validation from other fields
	document.getElementById("submit").setAttribute("class", "disabled");
}

function saveHobby(){
	var val = document.getElementById("newHobFld").value;
	var newhob = document.querySelectorAll(".myHob"); //gets all hobbies unchecked or checked

    if(ifExist(newhob, val)){ // checks if newly added hobby exist as one of the options
    	document.getElementById("valHobbies").innerHTML = "Hobby already exist.";
    }else{
    	document.getElementById("valHobbies").innerHTML = "";
    	if(isEmpty(val)){ // checks if new hobby field is empty
    		document.getElementById("valHobbies").innerHTML = "This field can not be empty.";
    	}else{ // new hobby field not empty
    		document.getElementById("valHobbies").innerHTML = "";

    		if(parseInt(nameVal(val).length) > 0){ // used nameVal() function to validate input for new hobby
    			document.getElementById("valHobbies").innerHTML = nameVal(val);
    		}else{
    			//replaced save button back to add hobby button
    			var html = '<button type="button" id="addHobBtn" name="Add_Hobby" onclick="addHobby()">Add Hobby</button>';
				document.getElementById("hobfunc").innerHTML = html;

				addElement("newhobbies", "input", "checkbox", "Hobbies", "myHob", val); // added a checkbox element for new hobby

				document.getElementById("submit").disabled = false; // enabled back submit button
				document.getElementById("submit").removeAttribute("class", "disabled");
    		}
		}
	}
}

function addElement(parentId, elementTag, type, name, cls, val) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute("class", cls);
    newElement.type = type;
    newElement.name = name;
    newElement.value = val;
    var text = document.createTextNode(" " + val);
    var br = document.createElement("br");

	p.appendChild(newElement); //added the element checkbox without text
    p.appendChild(text); // added the text node for checkbox element
    p.appendChild(br); //added br element
}

function ifExist(hob, text){
	// hob is an array to check whether text value exist
	// text is the value to be added
	var res = false;
	var b = text.toLowerCase()  // converted text to lowercase to the string characters
	for(var i = 0; i < hob.length; i++){
		var a = hob[i].value.toLowerCase(); // converted text to lowercase to the string characters
		if(a.trim() == b.trim()){ // used .trim() to remove white spaces to both ends
			res = true;
		}
	}
	return res;
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}