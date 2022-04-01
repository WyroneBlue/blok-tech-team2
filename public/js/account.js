const editButton = document.querySelector("#accountheader #editbutton");

const closeButton = document.querySelectorAll("button")[1];
// console.log(closeButton);
const formEdit = document.querySelector("#hover");

if (closeButton) {
    closeButton.addEventListener("click", toggleMenu);
    
}

if (editButton) {
    editButton.addEventListener("click", toggleMenu);
}

function toggleMenu(){
    formEdit.classList.toggle("open");
}

