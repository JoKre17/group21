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
		var parent_id = document.getElementById('abort_button').myParent;
		//var parent_id = $(this).parent().parent().attr('id');
		//parent_id = "#" + parent_id;
		console.log("abort button pressed" + parent_id);
		closePage(parent_id);
		
	});
}

function openPage(pageId){
	showAbortButton(pageId);
	$(pageId).fadeIn(0);
	$(pageId).animate({
		width:"100%",
		height:"100%"
	}, 800);
	
	
	switch($(pageId).attr('id')){
		case 'drunk_menu-container':
			console.log($(pageId).attr('id') + " openend.");
			var drunk_menu_container = document.getElementById($(pageId).attr('id'));
			clearPage(pageId);
			buildLocationDetectionScreen(drunk_menu_container);
			window.setTimeout(showDrunkMenuDialog, 1000, drunk_menu_container);
			break;
			
	}
}

function closePage(pageId){
	$(pageId).animate({
		width:"0",
		height:"0"
	}, 800);
	$(pageId).fadeOut(0);
	hideAbortButton();
}

function clearPage(pageId){
	$(pageId).empty();
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

function buildLocationDetectionScreen(parentDiv){
	var locationScreen = document.createElement('div');
	
	var loadingIconImage = new Image();
	loadingIconImage.src = 'https://media.giphy.com/media/l0HlRF0GurmvjniFO/giphy.gif';
	loadingIconImage.style.display = '-webkit-box';
	loadingIconImage.style.paddingTop = '50%';
	loadingIconImage.style.paddingLeft = '20%';
	loadingIconImage.style.width = '60%';
	
	var infoLabel = document.createElement('label');
	infoLabel.innerHTML = "You are being located";
	infoLabel.style.display = '-webkit-box';
	infoLabel.style.textAlign = '-webkit-center';
	infoLabel.style.paddingTop = '10%';
	
	
	parentDiv.appendChild(loadingIconImage);
	parentDiv.appendChild(infoLabel);
}

function showDrunkMenuDialog(drunk_menu_container) {
	
	clearPage("#" + drunk_menu_container.id);
	
	var infoLabel = document.createElement('label');
	infoLabel.innerHTML = "Select your destination";
	infoLabel.style.display = '-webkit-box';
	infoLabel.style.textAlign = '-webkit-center';
	infoLabel.style.paddingTop = '10%';
	
	// Building Destination Dropdown Menu
	var dropdown = document.createElement('div');
	dropdown.className = "dropdown";
	
	var dropbutton = document.createElement('button');
	dropbutton.className = "dropbutton";
	dropbutton.innerHTML = "Dropdown";
	
	var dropdownContent = document.createElement('div');
	dropdownContent.className = "dropdown-content";
	
	// Build options here
	for(var i = 0; i < 5; i++) {
		var option = document.createElement('label');
		option.innerHTML = "Destination " + (i+1);
		dropdownContent.appendChild(option);
	}
	
	dropdown.appendChild(dropbutton);
	dropdown.appendChild(dropdownContent);
	
	drunk_menu_container.appendChild(infoLabel);
	drunk_menu_container.appendChild(dropdown);
}

function showAbortButton(pageId) {
	var abortButton = document.getElementById('abort_button');
	abortButton.myParent = pageId;
	abortButton.style.display = "table-footer-group";
}

function hideAbortButton() {
	document.getElementById('abort_button').style.display = "none";
}
















