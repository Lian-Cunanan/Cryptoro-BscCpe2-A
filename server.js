const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const chatHistory = [];

wss.on('connection', function connection(ws) {
    console.log('New client connected');

    // Send chat history to new client
    ws.send(JSON.stringify({ type: 'history', data: chatHistory }));

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        if (data.type === 'chat') {
            chatHistory.push(data);
            console.log('Received message:', data.username, data.message);

            // Broadcast message to all clients
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    });

    ws.on('close', function() {
        console.log('Client disconnected');
    });

    ws.on('error', function(error) {
        console.error('WebSocket error:', error);
    });
});