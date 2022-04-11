const radio = document.querySelectorAll(".radioCheck");
const option = document.querySelectorAll(".option")

let elementID;

radio.forEach(element => {
    element.addEventListener('click', () => {
        elementID = event.srcElement.id;

        option.forEach(element => {
            element.classList.add("hidden")
            if (element.classList.contains(elementID) == true){
                element.classList.remove("hidden")
            }
        })
    })
});