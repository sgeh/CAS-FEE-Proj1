class EditController {
	
	constructor(frmEdit, txtTitle, txtDescription, dteCompleteUntil, ddlStyleSelection) {
		this.navController = new NavigationController();
		this.noteStorage = new NoteStorage();
		
		this.frmEdit = frmEdit;
		this.txtTitle = txtTitle;
		this.txtDescription = txtDescription;
		this.dteCompleteUntil = dteCompleteUntil;
		this.ddlStyleSelection = ddlStyleSelection;
	}
	
	bootstrap() {
		this.styleSwitcher = new StyleSwitcher();
	
		this.frmEdit.addEventListener("submit", (event) => this.onFormSubmit(event));
		this.ddlStyleSelection.addEventListener("change", (event) => this.styleSwitcher.switchStyle(event.target.value));
	}

	onFormSubmit(event) {
		this.noteStorage.createNote(
			this.txtTitle.value,
			this.txtDescription.value,
			Number(this.frmEdit.elements.importance.value),
			dteCompleteUntil.value).then(
			() => {
				this.navController.goToHome();
			});
		event.preventDefault();
	}
}

document.addEventListener("DOMContentLoaded", function() {
	new EditController(
		document.getElementById("frmEdit"),
		document.getElementById("txtTitle"),
		document.getElementById("txtDescription"),
		document.getElementById("dteCompleteUntil"),
		document.getElementById("ddlStyleSelection")).bootstrap();
});