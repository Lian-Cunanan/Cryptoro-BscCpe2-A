const cryptoApiKey = 'b27c026e33182c71022b6c84f3d8f1343b7345ea4d2544f3e521fcecca52e7';
        let chartInstance = null;
        let countdownTimer = null;
        let countdownDuration = 10; // in seconds


        async function fetchCryptoList() {
            const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD&api_key=${cryptoApiKey}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const cryptos = data.Data.map(item => item.CoinInfo);
        
                // Get the datalist element
                const dataList = document.getElementById('cryptos');
        
                // Clear the datalist
                dataList.innerHTML = '';
        
                // Populate the datalist
                cryptos.forEach(crypto => {
                    const option = document.createElement('option');
                    option.value = crypto.Name;
                    dataList.appendChild(option);
                });
            } catch (error) {
                console.error("cannot find crypto list", );
            }
        }
        
        // Call the function to fetch the data and populate the datalist
        fetchCryptoList();

        async function fetchCurrencyList() {
            const url = 'https://openexchangerates.org/api/currencies.json';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const currencies = Object.entries(data);
        
                // Get the datalist element
                const dataList = document.getElementById('currencies'); // Replace 'currencies' with the id of your datalist
        
                // Clear the datalist
                dataList.innerHTML = '';
        
                // Populate the datalist
                currencies.forEach(([code, name]) => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.text = name;
                    dataList.appendChild(option);
                });
            } catch (error) {
                console.error("cannot find currency list", error);
            }
        }
        
        // Call the function to fetch the data and populate the datalist
        fetchCurrencyList();

        async function fetchMarketCapData(cryptoInput, currency, interval) {
            let url;
            switch (interval) {
                case '1h':
                    url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${cryptoInput}&tsym=${currency}&limit=24&api_key=${cryptoApiKey}`;
                    break;
                case '1d':
                    url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoInput}&tsym=${currency}&limit=7&api_key=${cryptoApiKey}`;
                    break;
                case '1w':
                    url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoInput}&tsym=${currency}&limit=30&api_key=${cryptoApiKey}`;
                    break;
                case '1m':
                    url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoInput}&tsym=${currency}&limit=120&api_key=${cryptoApiKey}`;
                    break;
                default:
                    url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cryptoInput}&tsym=${currency}&limit=7&api_key=${cryptoApiKey}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.Data.Data.map(entry => ({
                    date: new Date(entry.time * 1000),
                    closingPrice: entry.close,
                    high: entry.high
                }));
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        async function displayMarketCapChart(marketCapData, currency) {
            const ctx = document.getElementById('marketCapChart').getContext('2d');
            const closingPrices = marketCapData.map(entry => entry.closingPrice);
            const highPrices = marketCapData.map(entry => entry.high);

            if (chartInstance) {
                chartInstance.destroy();
            }

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: marketCapData.map(entry => entry.date.toLocaleDateString()),
                    datasets: [{
                        label: `Closing Price (${currency})`,
                        data: closingPrices,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    }, {
                        label: `High Price (${currency})`,
                        data: highPrices,
                        borderColor: '#FF5722',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `Market Cap for ${document.getElementById('cryptoInput').value.toUpperCase()} in ${currency}`,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        async function initialize() {
            const cryptoAssets = await fetchCryptoList();
            const cryptoList = document.getElementById('cryptos');
            for (const crypto of cryptoAssets) {
                const option = document.createElement('option');
                option.value = crypto.Name;
                option.text = `${crypto.Name} (${crypto.FullName})`;
                cryptoList.appendChild(option);
            }

            const currencyList = document.getElementById('currencies');
            const currencyAssets = await fetchCurrencyList();
            for (const currency of currencyAssets) {
                const option = document.createElement('option');
                option.value = currency[0];
                option.text = `${currency[0]} (${currency[1]})`;
                currencyList.appendChild(option);
            }

            const defaultCrypto = 'BTC';
            const defaultCurrency = 'USD';
            const defaultInterval = '1d';
            const marketCapData = await fetchMarketCapData(defaultCrypto, defaultCurrency, defaultInterval);
            await displayMarketCapChart(marketCapData, defaultCurrency);

            setInterval(async () => {
                const interval = document.getElementById('intervalSelect').value;
                const marketCapData = await fetchMarketCapData(defaultCrypto, defaultCurrency, interval);
            },);

            document.getElementById('usernameForm').onsubmit = function(event) {
                event.preventDefault();
                username = document.getElementById('usernameInput').value.trim();
                if (username) {
                    document.getElementById('usernameForm').style.display = 'none';
                    document.getElementById('chatForm').style.display = 'block';
                    connectWebSocket();
                }
            };
        }
        async function searchCrypto() {
            // Stop the current countdown timer if it's running
            clearInterval(countdownTimer);
        
            const cryptoInput = document.getElementById('cryptoInput').value.toUpperCase();
            const currencyInput = document.getElementById('currencyInput').value.toUpperCase();
            const interval = document.getElementById('intervalSelect').value;
        
            // Check if inputs are not empty
            if (!cryptoInput || !currencyInput) {
                document.getElementById('cryptoData').innerText = 'Please input both a cryptocurrency and a currency.';
                return;
            }
        
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoInput}&tsyms=${currencyInput}&api_key=${cryptoApiKey}`;
        
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
        
                document.getElementById('cryptoData').innerHTML = '';
        
                if (result[currencyInput]) {
                    document.getElementById('cryptoData').innerText = `The exchange rate for ${cryptoInput}/${currencyInput} is ${result[currencyInput]}`;
                    const marketCapData = await fetchMarketCapData(cryptoInput, currencyInput, interval);
                    await displayMarketCapChart(marketCapData, currencyInput);
        
                    // Start a new countdown timer after fetching data
                    startCountdown(countdownDuration);
                } else {
                    const closestCrypto = await findClosestCrypto(cryptoInput);
                    document.getElementById('cryptoData').innerText = `No exchange rate found for ${cryptoInput} or ${currencyInput}. Did you mean ${closestCrypto}?`;
        
                    // Do not start a new countdown timer if exchange rate is not available
                }
            } catch (error) {
                console.error(error);
                document.getElementById('cryptoData').innerText = 'The Exchange Doesnt Exist ';
        
               
                
            }
        }

        async function findClosestCrypto(input) {
            const cryptoAssets = await fetchCryptoList();
            const assetIds = cryptoAssets.map(asset => asset.Name);
            return assetIds.find(asset => asset.startsWith(input[0])) || 'an available crypto';
        }

        function updateCountdownDisplay(seconds) {
            const countdownElement = document.getElementById('countdown');
            countdownElement.innerText = `Next update in ${seconds} seconds`;
        }

        function startCountdown(duration) {
            let secondsRemaining = duration;
            updateCountdownDisplay(secondsRemaining);

            countdownTimer = setInterval(() => {
                secondsRemaining--;
                updateCountdownDisplay(secondsRemaining);

                if (secondsRemaining <= 0) {
                    clearInterval(countdownTimer);
                    updateCountdownDisplay('Updating...');
                    fetchAndUpdateData();
                }
            }, 1000);
        }

        async function fetchAndUpdateData() {
            const cryptoInput = document.getElementById('cryptoInput').value.toUpperCase();
            const currencyInput = document.getElementById('currencyInput').value.toUpperCase();
            const interval = document.getElementById('intervalSelect').value;
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoInput}&tsyms=${currencyInput}&api_key=${cryptoApiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                document.getElementById('cryptoData').innerHTML = '';

                if (result[currencyInput]) {
                    document.getElementById('cryptoData').innerText = `The exchange rate for ${cryptoInput}/${currencyInput} is ${result[currencyInput]}`;
                    const marketCapData = await fetchMarketCapData(cryptoInput, currencyInput, interval);
                    await displayMarketCapChart(marketCapData, currencyInput);
                } else {
                    const closestCrypto = await findClosestCrypto(cryptoInput);
                    document.getElementById('cryptoData').innerText = `No exchange rate found for ${cryptoInput}/${currencyInput}. Did you mean ${closestCrypto}?`;
                }
            } catch (error) {
                console.error(error);
                document.getElementById('cryptoData').innerText = 'An error occurred while fetching the data: ' + error.message;
            }

            startCountdown(countdownDuration);
        }

        function connectWebSocket() {
            ws = new WebSocket('ws://localhost:8080');

            ws.onopen = function() {
                console.log('WebSocket connection established');
            };

            ws.onmessage = function(event) {
                const message = JSON.parse(event.data);
                if (message.type === 'history') {
                    message.data.forEach(msg => {
                        displayMessage(msg);
                    });
                } else if (message.type === 'chat') {
                    // Check if data update is not already in progress
                    if (!countdownTimer) {
                        fetchAndUpdateData();
                    }
                    displayMessage(message);
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
                checkUsernameAvailability(inputUsername);
            }
        };

        async function checkUsernameAvailability(inputUsername) {
            const response = await fetch('https://your-backend-server/check-username', {
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

        window.onload = async function() {
            await initialize();
            startCountdown(countdownDuration);
        };