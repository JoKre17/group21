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

$(document).ready(function(){
	init();
});

//function $(elem){
//	return document.getElementById(elem);
//}

function init(){
	console.log("document ready");
	initLayout();
}

function initLayout(){
	$("#drunk-container").click(function(){
		console.log("Hallo");
		$("#drunk_menu-container").fadeIn('slow');
		
		$(createTextField(vehicle)).appendTo("#drunk_menu-container");
	});
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