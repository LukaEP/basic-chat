document.getElementById('login').addEventListener('click', () => {
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;

    fetch('http://localhost:3033/api/user/login', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "name": username,
            "password": password
        })
    }).then(async (data) => {
        let logged = await data.json();

        document.cookie = `auth_token=${logged.token}`;
        document.location.href = `http://localhost:3033/pages/user/${logged.user}`;
    })
});

document.getElementById('create-user').addEventListener('click', () => {
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;

    fetch('http://localhost:3033/api/user/create/user', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "name": username,
            "password": password
        })
    }).then(async (data) => {
        let logged = await data.json();

        document.cookie = `auth_token=${logged.token}`;
        document.location.href = `http://localhost:3033/pages/user/${logged.user}`;
    })
});