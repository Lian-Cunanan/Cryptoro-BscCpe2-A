let ws;
let username = '';

function connectWebSocket() {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = function() {
        console.log('WebSocket connection established');
    };

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data);
        if (message.type === 'history') {
            message.data.forEach(msg => {
                censorMessage(msg).then(censoredMsg => {
                    displayMessage(censoredMsg);
                });
            });
        } else if (message.type === 'chat') {
            censorMessage(message).then(censoredMsg => {
                displayMessage(censoredMsg);
            });
        }
    };

    ws.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    ws.onclose = function() {
        console.log('WebSocket connection closed');
    };

    document.getElementById('chatForm').onsubmit = function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
        if (message) {
            ws.send(JSON.stringify({ type: 'chat', username: username, message: message }));
            messageInput.value = '';
        }
    };
}

function censorMessage(message) {
    return new Promise((resolve, reject) => {
        fetch('https://www.purgomalum.com/service/containsprofanity?text=' + encodeURIComponent(message.message) + '&api_key=Eh5C86CB6PhuCxqwl2WCXUbY59LyEhCU')
            .then(response => response.text())
            .then(data => {
                if (data === 'true') {
                    fetch('https://www.purgomalum.com/service/plain?text=' + encodeURIComponent(message.message) + '&fill_text=****')
                        .then(response => response.text())
                        .then(censoredText => {
                            message.message = censoredText;
                            resolve(message);
                        });
                } else {
                    resolve(message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

function displayMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageWrapper = document.createElement('div');
    const messageElement = document.createElement('div');
    
    if (message.username === username) {
        messageElement.classList.add('message', 'sent');
    } else {
        messageElement.classList.add('message', 'received');
    }

    messageElement.innerText = `${message.username} : ${message.message}`;
    messageWrapper.appendChild(messageElement);
    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('usernameForm').onsubmit = function(event) {
    event.preventDefault();
    const inputUsername = document.getElementById('usernameInput').value.trim();
    if (inputUsername) {
        username = inputUsername;
        document.getElementById('usernameForm').style.display = 'none';
        document.getElementById('chatForm').style.display = 'block';
        connectWebSocket();
    }
};

async function checkUsernameAvailability(inputUsername) {
    const response = await fetch('http://127.0.0.1:5500/check-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: inputUsername })
    });

    if (response.ok) {
        const data = await response.json();
        if (data.available) {
            username = inputUsername;
            document.getElementById('usernameForm').style.display = 'none';
            document.getElementById('chatForm').style.display = 'block';
            connectWebSocket();
        } else {
            alert('Username is already taken. Please choose a different username.');
        }
    } else {
        console.error('Error checking username availability:', response.status);
    }
}

