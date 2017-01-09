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
	
	$("#settings-container").click(function(){
		openPage("#settings_page-container");
	});
	
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
	$(pageId).fadeIn(500);
	
	
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
	$(pageId).fadeOut(500);
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
	infoLabel.id = "infoLabel";
	infoLabel.className = "centered-label";
	
	
	var dropdown = document.createElement('select');
	dropdown.className = "dropdown";
	dropdown.size = 15;
	
	for(var i = 1; i < 5; i++){
		var option = document.createElement('option');
		option.id = i;
		option.innerHTML = "Destination " + i;
		option.className = "dropdown-content";
		$(dropdown).change(function(e) {
			document.getElementById('priceLabel').innerHTML = "Price: " + (Math.round(Math.random()*5000) / 100) + " Euro";
		});
		dropdown.appendChild(option);
	}
	
	var priceLabel = document.createElement('label');
	priceLabel.id = "priceLabel";
	priceLabel.innerHTML = "Price: " + (Math.round(Math.random()*5000) / 100) + " Euro";
	
	var orderButton = document.createElement('button');
	orderButton.className = "bottom-right-button";
	orderButton.innerHTML = "Order";
	$(orderButton).click(function(){
		showDrunkMenuWaitingDialog(drunk_menu_container);
	});
	
	drunk_menu_container.appendChild(infoLabel);
	drunk_menu_container.appendChild(dropdown);
	drunk_menu_container.appendChild(priceLabel);
	drunk_menu_container.appendChild(orderButton);
	
}

function showDrunkMenuWaitingDialog(drunk_menu_container) {
	clearPage("#" + drunk_menu_container.id);
	
	var waitLabel = document.createElement('label');
	waitLabel.innerHTML = "Please wait...";
	waitLabel.className = "centered-label";
	waitLabel.style.marginTop = '30%';
	
	var carLabel = document.createElement('label');
	carLabel.innerHTML = "Your car is on the way.";
	carLabel.className = "centered-label";
	carLabel.style.marginTop = '30%';
	
	var timeLabel = document.createElement('label');
	timeLabel.innerHTML = "Estimated Time: 5 min";
	timeLabel.className = "centered-label";
	timeLabel.style.marginTop = '30%';
	
	var nextButton = document.createElement('button');
	nextButton.className = "bottom-right-button";
	nextButton.innerHTML = "Next";
	$(nextButton).click(function(){
		$('.abort').click();
		$('#notification').fadeIn(1000);
		window.setTimeout(function(){
			$('#notification').fadeOut(1000);
		}, 4000);
	});
	
	drunk_menu_container.appendChild(waitLabel);
	drunk_menu_container.appendChild(carLabel);
	drunk_menu_container.appendChild(timeLabel);
	drunk_menu_container.appendChild(nextButton);
	
	
}

function showAbortButton(pageId) {
	var abortButton = document.getElementById('abort_button');
	abortButton.myParent = pageId;
	abortButton.style.display = "table-footer-group";
}

function hideAbortButton() {
	document.getElementById('abort_button').style.display = "none";
}
















