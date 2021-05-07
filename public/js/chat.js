var url = window.location.href.split("/");
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
                _id: chat._id,
                name: "teste"
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