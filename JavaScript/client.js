/**
 * 
 */
 
var vehicles = {
	Lamborghini : {
		name : "Lamborghini",
		seats: 2,
		assistance : true
	},
	Ferrari : {
		name : "Ferrari",
		seats : 2,
		assistance : true
	},
	Corsa : {
		name : "Corsa",
		seats : 5,
		assistance : false
	}
}

var targets = {
	locations : {
		Home : {
			name : "Home",
			price : 5.98
		},
		Parents : {
			name : "Parents",
			price : 23.21
		},
		Berlin : {
			name : "Berlin",
			from : "Hannover",
			to : "Berlin",
			price : 166.02,
			date : "21.12.2016"
		},
		Hamburg : {
			name : "Hamburg",
			from : "Wunstorf",
			to : "Hamburg",
			price : 108.44,
			date : "29.12.2016"
		}
	}
}

var selectedOptions = {
	book : {
		vehicle : vehicles.Lamborghini,
		startTime : (new Date()).getTime(),
		passengers : 0,
		foreigners : true,
		assistance : true,
		start : null,
		target : null
	},
	drunk : {
		selected : targets.locations.Home
	}
}

var soonTargets = {
	locations : []
};

function fillVehicles(){
	createOptions(vehicles,document.getElementById("Vehikel"));
	document.getElementById("book_from").innerHTML = selectedOptions.book.start;
	document.getElementById("book_to").innerHTML = selectedOptions.book.target;
	
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);

	var today = day+"."+month+"."+now.getFullYear();

	document.getElementById("Wann").valueAsDate = now;
	selectedOptions.book.startTime = today;

	document.getElementById("Anzahl_Mitfahrer").innerHTML = selectedOptions.book.passengers;
	document.getElementById("Fremde_Mitfahrer").checked = selectedOptions.book.foreigners;
	document.getElementById("Fahrtassistenz").checked = selectedOptions.book.assistance;
}

function fillBooking(){
	document.getElementById("res_from").innerHTML = selectedOptions.book.start;
	document.getElementById("res_to").innerHTML = selectedOptions.book.target;
	document.getElementById("res_vehicle").innerHTML = selectedOptions.book.vehicle.name;
	document.getElementById("res_date").innerHTML = selectedOptions.book.startTime;
	document.getElementById("res_passengers").innerHTML = selectedOptions.book.passengers;
	if (selectedOptions.book.foreigners){
		document.getElementById("res_foreigners").innerHTML = "Ja";
	} else {
		document.getElementById("res_foreigners").innerHTML = "Nein";
	}
	if (selectedOptions.book.assistance){
		document.getElementById("res_assistance").innerHTML = "Ja";
	} else {
		document.getElementById("res_assistance").innerHTML = "Nein";
	}
	
}

function createOptions(elements, target){
	for (var ele in elements){
		var opt = document.createElement("Option");
		opt.text = elements[ele].name;
		opt.id = elements[ele].name;
		target.appendChild(opt);
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
	
	$('#route-container').click(function(){
		openPage("#booking_page_route-container");
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
		case 'booking_page_route-container':
			var book_menu_container = document.getElementById($(pageId).attr('id'));
			clearPage(pageId);
			book_menu_container.innerHTML = document.getElementById('book_menu').innerHTML;
			$('#check_button').click(function(e){
				
				book_menu_container.innerHTML = document.getElementById('book_specifications').innerHTML;
				$('.check_final').click(function(e){
				book_menu_container.innerHTML = document.getElementById('arival').innerHTML;
					$('.check_final_final').click(function(e){
						var parent_id = document.getElementById('abort_button').myParent;
						logSoon();
						closePage(parent_id);
					});
					
					fillBooking();
				});

				fillVehicles();
			});
			
			break;
		case 'settings_page-container' :
			createTable(targets.locations, document.getElementById("log_previous"));
			break;
	}
}

function checkFinal()
{
	book_menu_container.innerHTML = document.getElementById('arival').innerHTML;
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
	
	$(dropdown).change(function(e) {
		selectedOptions.drunk.selected = targets.locations[e.target.value];
		if (selectedOptions.drunk.selected.price != null){
			document.getElementById('priceLabel').innerHTML = "Preis: " + selectedOptions.drunk.selected.price + " Euro";
		} else {
			document.getElementById('priceLabel').innerHTML = "Preis: " + (Math.round(Math.random()*5000) / 100) + " Euro";
		}
	});
	
	//Create Options
	createOptions(targets.locations,dropdown);
	
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

function set(string){
	switch(string){
		case "arrival" :
			selectedOptions.book.start = document.getElementById("arrival").value;
			break;
		case "destination" :
			selectedOptions.book.target = document.getElementById("destination").value;
			break;
		case "Vehikel" :
			selectedOptions.book.vehicle = vehicles[document.getElementById("Vehikel").value];
			break;
		case "Wann" :
			
			break;
		case "Anzahl_Mitfahrer" : 
			selectedOptions.book.passengers = document.getElementById("Anzahl_Mitfahrer").value;
			break;
		case "Fremde_Mitfahrer" :
			selectedOptions.book.foreigners = document.getElementById("Fremde_Mitfahrer").checked;
			break;
		case "Fahrtassistenz" :
			selectedOptions.book.foreigners = document.getElementById("Fahrtassistenz").checked;
			break;
	} 
}

//
function logSoon(){
	//TODO
	soonTargets.locations.push(
		selectedOptions.book
	);
	console.log(soonTargets);
}

function createTable(container, target){
	target.innerHTML = "";
	for (var loc in container){
		var act = container[loc];
		
		if (act.date != null){
			var row = document.createElement("div");
			row.className = "table-row";
			target.appendChild(row);
			
			for (var property in act){
				var cell = document.createElement("div");
				cell.className = "table-cell";
				cell.innerHTML = act[property];
				row.appendChild(cell);
			}
		}
	}
}












