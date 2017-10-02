class HomeController {
	
	constructor(lblElementCount, ddlStyleSelection) {
		this.navController = new NavigationController();
		this.noteStorage = new NoteStorage();
		
		this.lblElementCount = lblElementCount;
		this.ddlStyleSelection = ddlStyleSelection;
	}
	
	bootstrap() {
		this.styleSwitcher = new StyleSwitcher();

		this.ddlStyleSelection.addEventListener("change", (event) => this.styleSwitcher.switchStyle(event.target.value));
		
		this.noteStorage.getItems().then(
			(notes) => { this.lblElementCount.innerHTML = notes.length; });
	}

	onFormSubmit(event) {
		this.noteStorage.createNote(this.txtTitle.value, this.txtDescription.value, 5, dteCompleteUntil.value).then(() => {
			this.navController.goToHome();
		});
		event.preventDefault();
	}
}

document.addEventListener("DOMContentLoaded", function() {
	new HomeController(
		document.getElementById("lblElementCount"),
		document.getElementById("ddlStyleSelection")).bootstrap();
});