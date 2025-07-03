const titleInput=document.getElementById("titleInput");

const textInput=document.getElementById("textInput");

const searchInput=document.getElementById("searchInput");

const tagsInput=document.getElementById("tagsInput");

const saveBtn=document.getElementById("saveBtn");

const clearAllBtn=document.getElementById("clearAllBtn");

const displayNote=document.getElementById("displayNote");

const newNoteBtn=document.getElementById("newNoteBtn");

const clearBtn=document.getElementById("clearBtn");


displayNotes();             //display any existing notes

function displayNotes(searchTerm=""){
    searchTerm=searchTerm.toLowerCase();

    let notes=localStorage.getItem("notes");            //get stored notes as string
    let notesArray=notes?JSON.parse(notes):[];          //put all pre saved notes into an array otherwise create empty array
    displayNote.innerHTML="";                           // clear display area
    notesArray.forEach(function (note, index) {
    const titleMatch = note.title.toLowerCase().includes(searchTerm);
    const contentMatch = note.content.toLowerCase().includes(searchTerm);
    const tagsMatch = note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm));

    if (titleMatch || contentMatch || tagsMatch) {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `<h3>${note.title}</h3>
                                 <p>${note.content}</p>`;
        noteElement.classList.add("note-box");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
        let updatedNotes = notesArray;
        updatedNotes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        displayNotes(searchTerm); 
    });


        if (note.tags && note.tags.length > 0) {
            const tagsContainer = document.createElement("div");
            tagsContainer.classList.add("tags");

            note.tags.forEach(tag => {
                const tagBadge = document.createElement("span");
                tagBadge.innerText = tag;
                tagBadge.classList.add("tag-badge");
                tagsContainer.appendChild(tagBadge);
            });

            noteElement.appendChild(tagsContainer);
        }

        noteElement.appendChild(deleteBtn);
        displayNote.appendChild(noteElement);
    }
});

};

saveBtn.addEventListener("click", function(){                 
    let notes=localStorage.getItem("notes");        //obtain any pre saved notes
    let notesArray=notes?JSON.parse(notes):[];      //put all pre saved notes into an array otherwise create empty array

    let rawTags=tagsInput.value;
    let tagsArray=rawTags.split(",");

    let cleanedTags=[];
    tagsArray.forEach(tag => {
        let trimmed=tag.trim();
        if(trimmed !== ""){
            cleanedTags.push(trimmed);
        }
    });

    notesArray.push({                               //push entered note into the array
        title:titleInput.value,
        content:textInput.value,
        tags:cleanedTags
        
    })                                          
    localStorage.setItem("notes", JSON.stringify(notesArray));      //turn array into string and store in localStorage
    textInput.value="";
    titleInput.value="";
    tagsInput.value="";
    displayNotes();
});

clearAllBtn.addEventListener("click", function(){
    localStorage.removeItem("notes");
    displayNote.innerHTML="";
    textInput.value="";
});

searchInput.addEventListener("input", function(){
    let currentSearch=searchInput.value.toLowerCase();
    displayNotes(currentSearch);
});

newNoteBtn.addEventListener("click", function(){
    const form = document.getElementById("noteInputContainer");
    form.classList.toggle("show");
});

clearBtn.addEventListener("click", function(){
    titleInput.value = "";
    textInput.value = "";
    tagsInput.value = "";
});
