class NavigationController {
	goToHome() {
		window.location.href = "index.html";
	}
	
	goToEdit(numToEdit = "") { 
		window.location.href = `edit.html?${numToEdit}`;
	}
}