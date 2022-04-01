const editButton = document.querySelector("#accountheader #editbutton");

// const closeButton = document.querySelector("button#closeicon");
const closeButton = document.querySelectorAll("button")[1];
console.log(closeButton);
const formEdit = document.querySelector("#hover");


closeButton.addEventListener("click", toggleMenu);
editButton.addEventListener("click", toggleMenu);

function toggleMenu(){
    formEdit.classList.toggle("open");
}

// const openButton = document.querySelector('#accountheader img');
// const closeButton = document.querySelector('#close');
// const menu = document.querySelector('nav');

// /* We've applied function names as the second parameter of these eventListeners
// 	However, we'd like to change these to anonymous arrow functions, making the 
// 	functions closeMenu() and openMenu() oblivious
// 	Source: https://www.30secondsofcode.org/articles/s/javascript-arrow-function-event-listeners */
// openButton.addEventListener('click', (event) => {
// 	// console.log(event.target.nextElementSibling);
// 	menu.classList.add('is-open')
// 	// event.target.nextElementSibling.classList.add('is-open')
// } );
									 
// closeButton.addEventListener('click', (event) => {
// 	menu.classList.remove('is-open')
// 	// event.target.nextElementSibling.classList.remove('is-open')

// });
