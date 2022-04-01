const editButton = document.querySelector("#accountheader #editbutton");

const closeButton = document.querySelector("#closeicon");
// console.log(closeButton);
const formEdit = document.querySelector("#hover");

if (closeButton) {
    closeButton.addEventListener("click", toggleMenu);
    
}

if (editButton) {
    editButton.addEventListener("click", toggleMenu);
}

function toggleMenu(e){
    e.preventDefault();
    console.log(e);
    formEdit.classList.toggle("open");
}

