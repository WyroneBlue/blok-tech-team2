const socket = io('http://localhost:8080');
const chatContainer = document.querySelector('#message-container ul');
const form = document.querySelector('form');
let input;
if(form){
    input = form.querySelector('input#message');
}

const addMessage = (msg, type) => {

    let msgTemplate = `
        <li class="${type}">
            <p>${msg}</p>
        </li>    
    `
    chatContainer.insertAdjacentHTML('beforeend', msgTemplate);
}

socket.on('new-msg', message => {
    console.log(message);
    addMessage(message, 'receiver');
})

if(form){

    form.addEventListener('submit', e => {
        e.preventDefault();
        const msg = input.value;
        socket.emit('new-msg-sent', msg);
        addMessage(msg, 'sender')
        input.value = '';
    })
}
