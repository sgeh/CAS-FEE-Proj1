import { NoteStorage } from '../model/note-storage.js';
import { Note } from '../model/note.js';
import { NoteDataService } from '../data/note-data-service.js';
import { NavigationController } from './navigation-controller.js';
import { StyleSwitcher } from './components/style-switcher.js';

;(function($) {

	class EditController {

		constructor(noteEditTemplate, frmEdit, plnEditField, ddlStyleSelection) {
			this._noteEditTemplate = noteEditTemplate;
			this._frmEdit = frmEdit;
			this._plnEditField = plnEditField;
			this._ddlStyleSelection = ddlStyleSelection;
			this._nodeToEdit = null;
		}


		bootstrap() {
            this._navController = new NavigationController();
            this._noteStorage = new NoteStorage(new NoteDataService());

            this._noteEditTemplateProcessor = Handlebars.compile(this._noteEditTemplate.html());

			this._styleSwitcher = new StyleSwitcher($("link[data-themes]"));

			this._frmEdit.on("submit", (event) => this.onFormSubmit(event));
			this._ddlStyleSelection.on("change", (event) => this._styleSwitcher.switchStyle(event.target.value));

			let id = Number(this._navController.getParameters().id);
            if (!isNaN(id)) {
                this._noteStorage.getNote(id).then(note => {
                    this._nodeToEdit = note;
                    this.updateUI(this._nodeToEdit);
                });
            } else {
                this.updateUI();
			}
		}

		updateUI(note) {
            note = note || new Note();
            this._plnEditField.html(this._noteEditTemplateProcessor(note));
            this._txtTitle = $("#txtTitle");
            this._txtDescription = $("#txtDescription");
            this._dteCompleteUntil = $("#dteCompleteUntil");
		}

		onFormSubmit(event) {
			if (!this._nodeToEdit) {
                this._noteStorage.createNote(
                    this._txtTitle.val(),
                    this._txtDescription.val(),
                    Number(this._frmEdit.prop("elements").importance.value),
                    this._dteCompleteUntil.prop("valueAsDate")).then(() => {
                        this._navController.goToHome();
                    });
            } else {
                this._nodeToEdit.title = this._txtTitle.val();
                this._nodeToEdit.description = this._txtDescription.val();
                this._nodeToEdit.importance = Number(this._frmEdit.prop("elements").importance.value);
                this._nodeToEdit.dateFinished = this._dteCompleteUntil.prop("valueAsDate");

                this._noteStorage.updateNote(this._nodeToEdit).then(() => {
                    this._navController.goToHome();
				});
			}
			event.preventDefault();
		}
	}

	$(function() {
		new EditController(
            $("#note-edit-template"),
			$("#frmEdit"),
			$("#plnEditField"),
			$("#ddlStyleSelection")).bootstrap();
	});

})(jQuery);