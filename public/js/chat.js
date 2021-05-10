var url = window.location.href.split("/");
var socket = io();

onload();

function onload() {
    fetch(`http://localhost:3033/api/chat/list/messages`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            "user": url[5]
        })
    })
    .then(async (data) => {
        let chats = await data.json();

        const template_chats = document.getElementById('template-chats').innerHTML;

        chats.chats.map((chat) => {
            const rendered = Mustache.render(template_chats, {
                _id: chat.chat_id,
                name: chat.user.name
            });

            document.getElementById('chats-show').innerHTML += rendered;
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

document.getElementById('call-button').addEventListener('click', (event) => {
    let newChat = document.getElementById('new-chat').value;

    fetch(`http://localhost:3033/api/chat/new`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            "other_user": newChat,
            "user_me": url[5]
        })
    })
    .then((data) => {
        onload();
    })
    .catch((error) => {
        console.log(error);
    })
});

function chatWith(id) {
    socket.emit("receive_messages", id, (messages) => {
        const templateChatting = document.getElementById('template-chatting').innerHTML;

        if (messages.messages.length <= 0) {
            const rendered = Mustache.render(templateChatting, {
                chat_id: messages._id,
                my_id: url[5]
            });

            document.getElementById('display-messages').innerHTML += rendered;
        }

        messages.messages.map((message) => {
            const rendered = Mustache.render(templateChatting, {
                message: message.message,
                date: message.date,
                chat_id: messages._id,
                my_id: url[5]
            });

            document.getElementById('display-messages').innerHTML += rendered;
        });
    });
}

function sendMessage(chat_id, my_id) {
    const message = document.getElementById('text-message').value;
    
    const params = {
        "message": message,
        "sent_by": my_id,
        "chat_id": chat_id
    }

    socket.emit('send_message', params);
}