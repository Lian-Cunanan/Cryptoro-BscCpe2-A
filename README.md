
## CRYPTORO

This is a web application for searching and visualizing cryptocurrency data.

## Main Obejectives
## CRYPTORO

This website can provide a real-time cryptocurrency visualization dashboard and offering live price charts and market data. Not only can you track the value of your favorite cryptocurrency’s moment by moment, but you can also convert them to various fiat currencies, like USD and PHP, for easy comparison. With live price charts and market information, this website allows you to stay informed and make informed decisions regarding your cryptocurrency investments. Furthermore, the platform fosters a collaborative environment through a built-in forum, facilitating valuable interaction and knowledge exchange between users.

## Functionalities

Landing Page 
- 	Welcome Section

Navigation Bar
- Provides seamless access to all sections of the website.

Currency 
- Search function to search your desire cypto currencies and fiat currencies.
- Real-time cryptocurrency data visualization.
- Live cryptocurrency converter to various fiat currencies.

Forum
- Interactive platform for user engagement and discussions.

About Us
- Brief introduction to our team and mission.

Footer
- Social Media Links

## Features

- Real-time cryptocurrency data visualization using Chart.js
- Safe chat interface for querying data with automatic profanity filtering
- User-friendly interface with clearly labeled navigation links and input fields
- Responsive design that displays correctly on a variety of devices and screen sizes

## Flowchart

![Flowchart](flowcharts.drawio.png)


## APIs Used

- [CryptoCompare API](https://min-api.cryptocompare.com/) for fetching real-time cryptocurrency data
- [Bad Words API](https://apilayer.com/marketplace/bad_words-api) for filtering out profanity in chat messages

## Setup

To run this project, follow these steps:

1. Open your terminal.
2. Navigate to the project directory.
3. Install the necessary npm packages by running `npm install` and `npm install ws`.
4. Run the command `node server.js`.
5. Go to the `node_modules` folder.
6. Find `index.html` and open it using live server.

You will also need to add the following scripts to your HTML file:



```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0"></script>
```


## Contributors

- Charles Daniel A. Mirande: Frontend development
- Kenneth Ivan A. Manarang: Software design
- Aldrich C. Icat: Backend and server development
- Lian Vince L. Cunanan: Helped with backend and integrated frontend and backend

