




function loadViewcurrency() {
    $(".content").html(`    
        <main>
            <section class="market-cap">
                <h1>Crypto Chart</h1>
                <div class="chart">
                    <canvas id="marketChart"></canvas>
                </div>
            </section>
            <aside>
                <div class="search-bar">
                    <div class="time-selection">
                        <select id="timeSelect">
                            <option value="24h">24h</option>
                            <option value="7d">7d</option>
                            <option value="30min">30min</option>
                        </select>
                    </div>
                    <input type="text" id="pokemonInput" placeholder="Search your Crypto Currency you desire">
                    <button id="searchButton">Search</button>
                </div>
                <div id="searchResults"></div>
            </aside>
        </main>
        <footer>
            <div class="recent-transactions">
                <h2>RECENT TRANSACTIONS MADE IN BLOCKCHAINS HERE</h2>
                <div class="transactions-table">
                    <div class="table-header">
                        <span>WALLETADDRESS</span>
                        <span>AMOUNT</span>
                        <span>CURRENCY NAME</span>
                    </div>
                    <!-- Transactions will be dynamically loaded here -->
                </div>
            </div>
        </footer>
    `);

    const cryptoApiKey = 'b27c026e33182c71022b6c84f3d8f1343b7345ea4d2544f3e521fcecca52e7';
    let chartInstance = null;
    let countdownTimer = null;
    let countdownDuration = 10; // in seconds
    let ws;
    let username = '';

    // ...rest of your JavaScript code...
}

function loadViewChat() {

    $(".content").html(`
        <h1>Forum</h1>
        <div id="chatMessages" style="height: 300px; border: 1px solid #ccc; padding: 10px; overflow-y: scroll;"></div>
        <input type="text" id="chatInput" placeholder="Type a message..." style="width: 70%; margin-top: 10px;">
        <button id="sendButton" style="width: 28%; margin-top: 10px; margin-left: 2%;">Send</button>
    `);

    $("#sendButton").click(function() {
        const message = $("#chatInput").val();
        if (message) {
            // Send the message...
            $("#chatInput").val("");
        }
    });
}

function loadAboutUs() {

    $('.content').html(`
        <div class="section" id="section4">
            <main class="team">
                <div class="wrapper">
                    <div class="outer">
                        <h1 class="teamheading">Our Team</h1>
                        <div class="info" style="--delay:-1;">
                            <div class="content">
                                <div class="img"><img src="image_team/ken.jpg" alt=""></div>
                                <div class="details">
                                    <span class="name">Kenneth Manarang</span>
                                    <p>Team Leader</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="info" style="--delay:0;">
                            <div class="content">
                                <div class="img"><img src="image_team/ald.jpg" alt=""></div>
                                <div class="details">
                                    <span class="name">Aldrich Icat</span>
                                    <p>Software Developer</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="info" style="--delay:1;">
                            <div class="content">
                                <div class="img"><img src="image_team/charles.jpg" alt=""></div>
                                <div class="details">
                                    <span class="name">Charles Mirande</span>
                                    <p>UI Designer and Editor</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="info" style="--delay:2;">
                            <div class="content">
                                <div class="img"><img src="image_team/lian.jpg" alt=""></div>
                                <div class="details">
                                    <span class="name">Lian Cunanan</span>
                                    <p>Software Developer</p>
                                </div>
                            </div>
                        </div>
                        <div class="info" style="--delay:2;">
                            <div class="content">
                                <div class="img"><img src="image_team/logo.png" alt=""></div>
                                <div class="details">
                                    <span class="name">Cryptoro Team </span>
                                    <p>Made with Love</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div class="about-container">
    <h1>About Us</h1>
    <p>Crypto was made by 4 college 2nd year college students with simplicity in mind. It was made so that everyone can monitor every cryptocurrency even if you’re just a beginner or someone who doesn’t have an idea what crypto is. We wanted to make a blockchain monitoring site so that it’s easier to view or spot the currency you want while keeping with just the essentials.</p>
    
    <h2>Address: Phase 1 Miranda Comp Barangay Maimpis </h2>
    
    <h2>Email: cryptoromonitoring.@gmail.com </h2>
</div>
    `);
}

  