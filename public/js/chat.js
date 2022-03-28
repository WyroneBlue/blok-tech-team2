const socket = io('http://localhost:8080');
const chatContainer = document.querySelector('#message-container ul');
const form = document.querySelector('form');
let input;
if(form){
    input = form.querySelector('input#message');
}

let latestMsg;

const saveMessageHistory = async(msg, date) => {
    const route = window.location.pathname;
    try {
        const response = await axios.post(route, {
            msg: msg,
            date: date
        });
        return response;
    } catch (errors) {
        console.error(errors);
    }
}

const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}`
}

const showLatestMsg = () => {
    latestMsg.scrollIntoView();
}

const addMessage = async (msg, type) => {

    let date = new Date();
    let formatedTime = formatTime(date)
    let success = await saveMessageHistory(msg, date);
    if(success && success.data != 'not_accepted'){

        let msgTemplate = `
            <li class="${type} new">
                <p>${msg}</p>
                <span>${formatedTime}</span>
            </li>    
        `
        chatContainer.insertAdjacentHTML('beforeend', msgTemplate);
        latestMsg = chatContainer.querySelector('li:last-child');
            
        latestMsg.addEventListener('animationend', (e) => {
            e.target.classList.remove('new');
        });
        showLatestMsg();

    } else if(success.data == 'not_accepted'){
        alert('This chat is not accepted yet!')
    } else {
        alert('Could not send message. Please try again later.')
    }
}

socket.on('new-msg', message => {
    addMessage(message, 'receiver');
})

if(form){

    form.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const msg = form.get("message");
        socket.emit('new-msg-sent', msg);
        addMessage(msg, 'sender')
        input.value = '';
    })
}

window.addEventListener('DOMContentLoaded', () => {
    if(chatContainer){
        latestMsg = chatContainer.querySelector('li:last-child');
        showLatestMsg();
    }
})