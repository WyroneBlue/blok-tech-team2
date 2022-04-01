const editButton = document.querySelector(".editbutton");
const closeButton = document.querySelector(".closeicon");
const formEdit = document.querySelector(".hover");


closeButton.addEventListener("click", toggleMenu);
editButton.addEventListener("click", toggleMenu);

function toggleMenu(){
    formEdit.classList.toggle("open")
}