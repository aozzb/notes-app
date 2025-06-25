const textInput=document.getElementById("textInput");

const saveBtn=document.getElementById("saveBtn");

const clearBtn=document.getElementById("clearBtn");

const displayNote=document.getElementById("displayNote");

displayNote.innerText=localStorage.getItem("note"); //displaying any stored notes

saveBtn.addEventListener("click", function(){
    localStorage.setItem("note", textInput.value);
    displayNote.innerText=localStorage.getItem("note");  //save button functionality 
    textInput.value="";
})

clearBtn.addEventListener("click", function(){
    localStorage.removeItem("note");
    displayNote.innerText=localStorage.getItem("note");
    textInput.value="";
})





