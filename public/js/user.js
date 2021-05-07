var socket = io();

document.getElementById('button').addEventListener('click', (event) => {
    let username = document.getElementById('user').value;

    socket.emit("send_username", username, (user) => {
        window.location.href = `http://localhost:3033/pages/user/${user._id}`;
    });
});