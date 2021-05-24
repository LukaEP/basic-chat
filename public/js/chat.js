var url = window.location.href.split("/");
var socket = io();

onload();

socket.on("receive_messages", (messages) => {
    document.getElementById('display-messages').innerHTML = null;

    messages.messages.map((message) => {
        let date = new Date(message.date);

        let displayDate = `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`;

        let template = message.sent_by === url[5] ? 'template-chatting-me' : 'template-chatting-other';

        const templateChatting = document.getElementById(template).innerHTML;

        const rendered = Mustache.render(templateChatting, {
            "message": message.message,
            "date": displayDate
        });

        document.getElementById('display-messages').innerHTML += rendered;
    });

    const scrollDiv = document.getElementById('display-messages');
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
});

function onload() {
    axios.get(`http://localhost:3033/api/chats/${url[5]}`)
    .then(async (data) => {
        document.getElementById('chats-show').innerHTML = null;

        const template_chats = document.getElementById('template-chats').innerHTML;

        data.data.chats.map((chat) => {
            const rendered = Mustache.render(template_chats, {
                _id: chat.chat_id,
                name: chat.user.name
            });

            document.getElementById('chats-show').innerHTML += rendered;
        });

        let params = {
            user: url[5],
            chat: url[6]
        };

        if (url[6]) {
            document.getElementById('send-messages').style.display = "block";
            socket.emit("call_messages", params);
        } else {
            document.getElementById('send-messages').style.display = "none";
        }

    })
    .catch((error) => {
        console.log(error);
    })
}

document.getElementById('call-button').addEventListener('click', (event) => {
    let newChat = document.getElementById('new-chat').value;

    axios.post(`http://localhost:3033/api/chats`, {
        "other_user": newChat,
        "user_me": url[5]
    })
    .then(() => {
        onload();
        document.getElementById('new-chat').value = null;
    })
    .catch((error) => {
        if (error.response.status == 400) {
            document.querySelector(".error-box").style.display = "block";
            document.getElementById("message-error").innerHTML = error.response.data.message;
        }
    })
});

function chatWith(id) {
    window.location.href = `http://localhost:3033/pages/user/${url[5]}/${id}`;
}

function sendMessage() {
    const message = document.getElementById('text-message').value;

    const params = {
        "message": message,
        "sent_by": url[5],
        "chat_id": url[6]
    }

    socket.emit('send_message', params);

    document.getElementById('text-message').value = null;
}

function logout() {
    axios.post(`http://localhost:3033/api/user/logout`, {
        "user_me": url[5]
    })
    .then(() => {
        window.localStorage.removeItem("auth_token");
        window.location.href = `http://localhost:3033/pages/`;
    })
}