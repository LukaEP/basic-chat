// import axios from "axios";

document.getElementById('button').addEventListener('click', (event) => {
    let socket = io();
    let username = document.getElementById('user').value;

    socket.emit("send_username", username);
});