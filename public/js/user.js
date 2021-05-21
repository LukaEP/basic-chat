document.getElementById('login').addEventListener('click', () => {
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;

    axios.post('http://localhost:3033/api/user/login', {
        "name": username,
        "password": password
    })
    .then((data) => {
        document.cookie = `auth_token=${data.data.token}`;
        document.location.href = `http://localhost:3033/pages/user/${data.data.user}`;
    })
    .catch((error) => {
        document.querySelector(".invalid-box").style.display = "block";

        setTimeout(() => {
            document.querySelector(".invalid-box").style.display = "none";
        }, 3000);
    })
});

document.getElementById('create-user').addEventListener('click', () => {
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;

    axios.post('http://localhost:3033/api/user', {
        "name": username,
        "password": password
    }).then(async (data) => {
        document.cookie = `auth_token=${data.data.token}`;
        document.location.href = `http://localhost:3033/pages/user/${data.data.user}`;
    })
});