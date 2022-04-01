const socket = io('http://localhost:8080');

const chatContainer = document.querySelector('#chat-container ul');
const messageForm = document.querySelector('#message-container form');
const messageFormTextarea = document.querySelector('#message-container form textarea');
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

const showLatestMsg = async(smooth = true) => {
    let behavior = (smooth) ? 'smooth' : 'auto'

    await latestMsg.scrollIntoView({
        behavior: behavior
    });
}

const addMessage = async (msg, type, save = true) => {

    let date = new Date();
    let formatedTime = formatTime(date)
    let success = true;

    if(save){
        success = false;
        success = await saveMessageHistory(msg, date);
    }
    if(success && success.data != 'not_accepted'){

        let msgTemplate = `
            <li class="${type} wait">
                <p>${msg}</p>
                <span>${formatedTime}</span>
            </li>    
        `
        chatContainer.insertAdjacentHTML('beforeend', msgTemplate);
        latestMsg = chatContainer.querySelector('li:last-child');
        showLatestMsg();

        setTimeout(() => {
            latestMsg.classList.remove('wait') 
            latestMsg.classList.add('new') 
        }, 100);
            
        latestMsg.addEventListener('animationend', (e) => {
            e.target.classList.remove('new');
        });

    } else if(success.data.error && success.data.error == 'not_accepted'){
        alert('This chat is not accepted yet!')
    } else {
        alert('Could not send message. Please try again later.')
    }
}

const submitForm = async(e) => {
    e.preventDefault();
    const form = new FormData(messageForm);
    const msg = form.get("message").trim();
    if(msg.length){
        await socket.emit('new-msg-sent', { 
            name: chatName,
            msg: msg, 
        });
        addMessage(msg, 'sender')
        messageForm.reset();
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    const key = window.event.keyCode;
    if (key === 13) {
        submitForm(e);
        return false;
    }
}

if(messageFormTextarea){
    messageFormTextarea.addEventListener('keyup', handleSubmit)
}

if(messageForm){
    let chatName = document.getElementById('chatName').value;
    socket.emit('join-chat', chatName);
    messageForm.addEventListener('submit', submitForm);
}

socket.on("user connected", (user) => {
    console.log(user);
});

socket.on('new-msg', message => {
    if(chatContainer){
        addMessage(message, 'receiver', false);
    }
})

window.addEventListener('DOMContentLoaded', () => {
    if(chatContainer){
        latestMsg = chatContainer.querySelector('li:last-child');
        if(latestMsg){
            showLatestMsg(false);
        }
    }
})