$(document).ready(function() {
    loadHome();

    $("a[href='#home']").click(function(event) {
        event.preventDefault();
        loadHome();
    });

    $("a[href='#viewPlayer']").click(function(event) {
        event.preventDefault();
        loadViewPlayer();
    });

    $("a[href='#viewStats']").click(function(event) {
        event.preventDefault();
        loadViewStats();
    });

    $("a[href='#viewChat']").click(function(event) {
        event.preventDefault();
        loadViewChat();
    });

    $("a[href='FAQ.html']").click(function(event) {
        event.preventDefault();
        // Add your function here
    });
});

function loadHome() {
    $(".content").html(`
        <main>
            <div class="home-content">
                <img src="landingpic.png" alt="Cryptoro Logo" class="home-image">
                <h1 class='home-header'>CRYPTORO<span>CryptoCurrency PriceWatch Made Easy</span></h1>
                <p>From bitcoin to any cryptocurrency you can think of, you can freely roam and view the history of each currency. Browse through thousands of currencies and monitor them at your will! Cryptoro’s purpose is to provide a simple website where everyone can view the prices shown in realtime.</p>
            </div>
            <button class="myButton" id="goToMonitoringButton">Go to Monitoring</button>
        </main>
    `);
}