// Empty notes array
var notes = []; 
var notes2 = [];
var k = 1;

// Key to store and retrieve from local storage
var key = "notesapp";

window.onload = function() { 
    // Click handler used to add a note whenever the 
    // Submit button is clicked.
    var submitButton = document.getElementById("addItem");
    var saveAll = document.getElementById("saveAll");
	submitButton.onclick = createNote;
	saveAll.onclick = saveNotes;
    
    // Check for localStorage capabilities 
    if (!window.localStorage) {
        // If localStorage is unavailable, warn user.  
		alert("Browser is not supported!");
	} else {
        // If localStorage is available, display notes.  
		loadNotes();
	}
    
    
    // Click handler used to remove notes
    var deleteNotesButton = document.getElementById("delete-notes");
	deleteNotesButton.onclick = deleteNotes;   
}

function createNote() { 
    // Get content of note
    var noteText = document.getElementById("toDoItem");
	text = noteText.value;
    
    // Ensure that note text is not empty
    if (text == null || text == "" || text.length == 0) {
		alert("Please enter a note!");
		return;
	}

    // Set note properties
    var note = {};
	note.text = text;
	notes.push(note);
    
    // Store our notes
	storeNotes();
    
    // Display note on page	
	addNoteToPage(note);
}

function addNoteToPage(note) { 
    // Determine where to place notes on page
    var notesUl = document.getElementById("theList");
	var li = document.createElement("li");
    
    // Add class name and attributes to notes
    li.className = "note";
    
	li.innerHTML = note.text;
	
    
	if (notesUl.childElementCount > 0) {
		notesUl.insertBefore(li, notesUl.firstChild);
	} else {
		notesUl.appendChild(li);
	}
}

function storeNotes() { 
    // Convert array of notes to string
    var jsonNotes = JSON.stringify(notes);
    
    // Store the note
	localStorage.setItem(key, jsonNotes);
}

function loadNotes() { 
    // Get our notes
    var jsonNotes = localStorage.getItem(key);
    
	if (jsonNotes != null) {
		notes = JSON.parse(jsonNotes);
        
		for (var i = 0; i < notes.length; i++) {
			addNoteToPage(notes[i]);

		}
	}
}

function deleteNotes() { 
    // Remove all notes from local storage
    window.onbeforeunload = function() {
        localStorage.removeItem(key);
        return 'Delete all of your notes?';
    };
}

function addNoteToDiv(note) { 
    // Determine where to place notes on page
    var notesUl = document.getElementById("savedNotes");
	var li = document.createElement("li");

    
    // Add class name and attributes to notes
    li.className = "note2";
  
	li.innerHTML = note.text;
	
    
	if (notesUl.childElementCount > 0) {
		notesUl.insertBefore(li, notesUl.firstChild);
	} else {
		notesUl.appendChild(li);
	}

}

function saveNotes (){
	var theList = document.getElementById("theList");
	var listaNote = document.getElementById("ListaNote");
	var saved = document.getElementById("savedNotes");
	var titlu = document.createElement("h4");
	titlu.innerHTML = "Your List, Sir";

	listaNote.insertBefore(titlu, listaNote.firstChild);

	listaNote.style.border = "1px solid #ccc";

	var jsonNotes2 = localStorage.getItem(key);
	notes2 = JSON.parse(jsonNotes2);

	for(var i=0; i<notes2.length; i++){
		addNoteToDiv(notes2[i]);
	}
}