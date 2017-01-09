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
	
	$("#drunk-container").click(function(){
		openPage("#drunk_menu-container");
	});
	
	/*$("#drunk_menu-container").click(function(){
		closePage("#drunk_menu-container");
	});*/
	
	$("#profile-container").click(function(){
		openPage("#profile_page-container");
	});
	
	/*$("#profile_page-container").click(function(){
		closePage("#profile_page-container");
	});*/
	
	$(".dummy-container").click(function(){
		openPage("#dummy_page-container");
		console.log("Dummy opened");
	});
	
	/*$("#dummy_page-container").click(function(){
		//closePage("#dummy_page-container");
		console.log("clicked, dummy");
	});*/
	
	$('.abort').click(function(e){
		var parent_id = $(this).parent().parent().attr('id');
		parent_id = "#" + parent_id;
		e.stopPropagation();
		//console.log("abort button pressed" + parent_id);
		closePage(parent_id);
		
	});
}

function openPage(pageId){
	$(pageId).fadeIn(0);
	$(pageId).animate({
		width:"100%",
		height:"100%"
	}, 800);
}

function closePage(pageId){
	$(pageId).animate({
		width:"0",
		height:"0"
	}, 800);
	$(pageId).fadeOut(0);
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
