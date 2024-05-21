var tasks = [
	"Kill two God Wars Dungeon bosses once", 
	"Kill Obor and Bryophyta once", 
	"Finish any easy diary completely", 
	"Kill OR get killed by another player in the wilderness", 
	"Kill all 3 multi-combat cave bosses once", 
	"Complete an Entry mode Theatre of Blood deathless", 
	"Do 10 Perilous Moons runs OR obtain any unique", 
	"Complete 3 hunter contracts", 
	"Defeat the Corporeal Beast once", 
	"Defeat all 4 Desert Treasure II bosses once", 
	"Do a speedrun of Beneath Cursed Sands", 
	"Obtain a unique from any clue casket", 
	"Do 10 Barrows runs OR obtain any unique", 
	"Defeat Galvek", 
	"Get a drop worth 30k+ in a single item", 
	"Defeat Glough", 
	"Defeat Seren", 
	"Run a lap of every rooftop agility course (excluding Ardougne)", 
	"Run through the Rogue's Den without plugins", 
	"Create and drink one of each Sq'irk Juice", 
	"Obtain a Fire Cape", 
	"Obtain any boss unique", 
	"Obtain a Gold Key from scratch in SoM", 
	"Steal a full set of HAM clothing from HAM Guards"
];
var usedTasks = [];
var clickedClam = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0};
var clickedSmok = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0};
var isFilled = isModalOpen = isInfoModalOpen = customToggle = false;

var bingoDiv = document.getElementById("bingo-container");

for (var i = 0; i < 25; i++) {
	var newTask = document.createElement("div");

	newTask.innerHTML = "<span class='task-completion-overlay' id='task-clam-" + i + "'></span>";
	newTask.innerHTML += "<span class='task-completion-overlay' id='task-smok-" + i + "'></span>";

	if (i == 12) {
		newTask.innerHTML += "<span class='task-text' id='task-text-" + i + "'>Complete any normal difficulty raid</span>";
	} else {
		randomTaskNum = Math.floor(Math.random() * tasks.length);
		newTask.innerHTML += "<span class='task-text' id='task-text-" + i + "'>" + tasks[randomTaskNum] + "</span>";

		if (tasks[randomTaskNum] != undefined)
			usedTasks.push(tasks[randomTaskNum]);

		tasks.splice(randomTaskNum, 1);
	}

	newTask.className = "bingo-task";
	newTask.id = "bingo-task-" + i;
	newTask.setAttribute("onClick", "clickFunction(" + i + ")");
	newTask.setAttribute("onContextMenu", "rightClickFunction(" + i + "); return false;");

	bingoDiv.appendChild(newTask);
}

function rightClickFunction(num) {
	var smokImg = document.getElementById("task-smok-"+num);

	switch(clickedSmok[num]) {
		case 0:
			clickedSmok[num]++;
			smokImg.className += " task-smok" ;
			break;
		case 1:
			clickedSmok[num] = 0;
			smokImg.className = "task-completion-overlay";
			break;
		default:
			alert("Something went wrong!");
	}

	checkForBingoSmok();
}

function clickFunction(num) {
	var clamImg = document.getElementById("task-clam-"+num);

	switch(clickedClam[num]) {
		case 0:
			clickedClam[num]++;
			clamImg.className += " task-clam" ;
			break;
		case 1:
			clickedClam[num] = 0;
			clamImg.className = "task-completion-overlay";
			break;
		default:
			alert("Something went wrong!");
	}

	checkForBingoClam();
}

function checkForBingoClam() {/*
	var totalInARow = 0;
	for (var i = 0; i < Object.keys(clickedClam).length; i++) {

	}*/
}

function checkForBingoSmok() {/*
	for (var i = Things.length - 1; i >= 0; i--) {

	}*/
}

function toggleCustomization() {
	if (!customToggle) {
		for (var i = 0; i < 25; i++) {
			document.getElementById("bingo-task-"+i).setAttribute("onClick", "toggleModal("+i+")");
		}
		document.getElementById("btn-customize").innerHTML = "Done";
		customToggle = true;
	} else {
		for (var i = 0; i < 25; i++) {
			document.getElementById("bingo-task-"+i).setAttribute("onClick", "clickFunction(" + i + ")");
		}
		document.getElementById("btn-customize").innerHTML = "Customize";
		customToggle = false;
	}
}

function toggleModal(num) {
	fillInfoTables(num);

	if (!isModalOpen) {
		document.getElementById("task-modal").style.visibility = "visible";
		document.getElementById("task-modal").style.opacity = "1";

		isModalOpen = true;
		return;
	}

	document.getElementById("task-modal").style.visibility = "hidden";
	document.getElementById("task-modal").style.opacity = "0";
	isModalOpen = false;
}

var modalWindow = document.getElementById("task-modal");

modalWindow.addEventListener("click", function (e) {
	if (e.target.id == "task-modal")
		toggleModal();
});

function fillInfoTables(num) {
	document.getElementById("task-select-table").innerHTML = "";

	for (var i = 0; i < usedTasks.length; i++) {
		var newRow = document.getElementById("task-select-table").insertRow(0);

		var newCell = newRow.insertCell(0);

		newCell.innerHTML = "<span onClick='changeTaskText(" + num + ", \"" + usedTasks[i] + "\")'>" + usedTasks[i] + "</span>";
	}
}

function changeTaskText(num, newTask) {
	document.getElementById("task-text-" + num).innerHTML = newTask;
	toggleModal();
}

function toggleInfoModal() {
	if (!isInfoModalOpen) {
		document.getElementById("info-modal").style.visibility = "visible";
		document.getElementById("info-modal").style.opacity = "1";

		isInfoModalOpen = true;
		return;
	}

	document.getElementById("info-modal").style.visibility = "hidden";
	document.getElementById("info-modal").style.opacity = "0";
	isInfoModalOpen = false;
}

var modalWindowInfo = document.getElementById("info-modal");
modalWindowInfo.addEventListener("click", function (e) {
	if (e.target.id == "info-modal")
		toggleInfoModal();
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");

	if (n > slides.length)
		slideIndex = 1
	if (n < 1)
		slideIndex = slides.length

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}

	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
}