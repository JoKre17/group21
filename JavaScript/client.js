/**
 * 
 */
 
var vehicle = {
	0 : {
		name : "Lamborghini"
	},
	1 : {
		name : "Ferrari"
	}
} 

window.onload = function(){
	init();
}

function $(elem){
	return document.getElementById(elem);
}

function init(){
	console.log("window loaded");
	initLayout();
}

function initLayout(){
	$("drunk-container").onclick = function(){
		console.log("clicked drunk-container");
		$("drunk_menu-container").style.display = "block";
		$("drunk_menu-container").appendChild(createTextField(vehicle));
	}
}

function createTextField(type){
	var textfield = document.createElement("INPUT");
	textfield.type = "TEXT";
	textfield.placeholder = "please type...";
	textfield.onkeyup = function(){
		for (var key in type){
			console.log(type[key].name);
		}
	}
	
	return textfield;
}