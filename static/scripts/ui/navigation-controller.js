/**
 * Navigation controller to provide facilities to navigate between pages.
 */
export class NavigationController {
	goToHome() {
		window.location.href = "index.html";
	}
	
	goToEdit(idToEdit = "") {
		window.location.href = `edit.html?id=${idToEdit}`;
	}

	getParameters() {
		let res = { };
		if (window.location.search) {
			let args = window.location.search.substr(1);
            args.split("&").forEach(arg => {
            	let param = arg.split("=");
            	res[decodeURIComponent(param[0])] = param[1] ? decodeURIComponent(param[1]) : void 0;
            })
		}
		return res;
	}
}