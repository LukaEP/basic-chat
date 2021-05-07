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
    .then((data) => {
        console.log(data.data);
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
        console.log(data.data);
    })
    .catch((error) => {
        console.log(error);
    })
});