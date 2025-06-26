const textInput=document.getElementById("textInput");

const saveBtn=document.getElementById("saveBtn");

const clearBtn=document.getElementById("clearBtn");

const displayNote=document.getElementById("displayNote");

displayNotes();             //display any existing notes

function displayNotes(){
    let notes=localStorage.getItem("notes");            //get stored notes as string
    let notesArray=notes?JSON.parse(notes):[];          //put all pre saved notes into an array otherwise create empty array
    displayNote.innerHTML="";                           // clear display area
    notesArray.forEach(function (note){                 //loop through the array containing notes and display them
        const noteElement=document.createElement("div");
        noteElement.innerText=note;
        noteElement.classList.add("note-box");
        displayNote.appendChild(noteElement);
    })

}

saveBtn.addEventListener("click", function(){
    let noteText = textInput.value;                 //get textarea input 
    let notes=localStorage.getItem("notes");        //obtain any pre saved notes
    let notesArray=notes?JSON.parse(notes):[];      //put all pre saved notes into an array otherwise create empty array
    notesArray.push(noteText);                      //push entered note into the array
    localStorage.setItem("notes", JSON.stringify(notesArray));      //turn array into string and store in localStorage
    textInput.value="";
    displayNotes();
})

clearBtn.addEventListener("click", function(){
    localStorage.removeItem("notes");
    displayNote.innerHTML="";
    textInput.value="";
})
