import { NoteStorage } from '../model/note-storage.js';
import { NoteDataService } from '../data/note-data-service.js';
import { NavigationController } from './navigation-controller.js';
import { StyleSwitcher } from './components/style-switcher.js';

;(function($) {

    class HomeController {
		constructor(noteListTemplate, pnlNotes, lblElementCount, ddlStyleSelection) {
            this._noteListTemplate = noteListTemplate;
			this._pnlNotes = pnlNotes;
			this._lblElementCount = lblElementCount;
			this._ddlStyleSelection = ddlStyleSelection;
			this._sortOrderAsc = false;
            this._sortProp = void 0;
		}

		bootstrap() {
            this._navController = new NavigationController();
            this._noteStorage = new NoteStorage(new NoteDataService());

            this._noteListTemplateProcessor = Handlebars.compile(this._noteListTemplate.html());
			this._styleSwitcher = new StyleSwitcher($("link[data-themes]"));

			this._ddlStyleSelection.on("change", (event) => this._styleSwitcher.switchStyle(event.target.value));

			$(document).on("click", "[data-note-edit]", (event) => this.onNoteEdit(event));
            $(document).on("click", "[data-note-close]", (event) => this.onNoteClose(event));
            $(document).on("click", "[data-sort-by]", (event) => this.onDataSort(event));

            this.updateUI();
		}

		updateUI() {
            this._noteStorage.getNotes(this._sortProp, this._sortOrderAsc).then(
                (notes) => {
                    this._pnlNotes.html(this._noteListTemplateProcessor({ notes }));
                    this._lblElementCount.html(notes.length);
                });
		}

        onDataSort(event) {
			let newSortProp = $(event.target).data("sort-by");
			if (this._sortProp !== newSortProp) {
				this._sortOrderAsc = false;
			} else {
                this._sortOrderAsc = !this._sortOrderAsc;
			}
			this._sortProp = newSortProp;

			this.updateUI();
            event.preventDefault();
		}

        onNoteEdit(event) {
			let noteId = $(event.target).data("note-edit");
			if (noteId) {
                this._navController.goToEdit(noteId);
			}
        }

        onNoteClose(event) {
            let noteId = $(event.target).data("note-close");
            if (noteId) {
                this._noteStorage.getNote(noteId).then(note => {
                    note.hasFinished = true;

                    this._noteStorage.updateNote(note).then(() => {
                        this.updateUI();
                    });
				});
            }
        }
	}

	$(function() {
		new HomeController(
            $("#note-list-template"),
			$("#pnlNotes"),
			$("#lblElementCount"),
			$("#ddlStyleSelection")).bootstrap();
	});

})(jQuery);