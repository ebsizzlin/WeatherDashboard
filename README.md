# WeatherDashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

# User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

# Completed

- weather dashboard, form inputs
- searching for city: cityList function (local storage, search display, API response)
- current conditions: locationWeather function (empty, append, correctly drawing from network, current conditions API response)
- future conditions: 5 day forecast API response in network & displayed
- 4 queryURLs
- hide & show onclick
- UV button
- moment.js

# Future Additions

- moment.js for forecasts
- temperature # doesn't make sense
- how to change button color depending on favorable, moderate, severe
- spread 5 forecast cards out even with the current city box

- bonus: change searches to buttons that can be clicked on & keep them displayed when you reseach (work schedule hw?)

# Screenshots

<img width="1556" alt="Screen Shot 2020-10-23 at 10 59 18 PM" src="https://user-images.githubusercontent.com/70185995/97066434-799a8180-1583-11eb-860c-cb30815532bc.png">
<img width="1375" alt="Screen Shot 2020-10-23 at 10 59 32 PM" src="https://user-images.githubusercontent.com/70185995/97066437-7bfcdb80-1583-11eb-9272-e551f19b5aea.png">
<img width="1554" alt="Screen Shot 2020-10-23 at 10 59 45 PM" src="https://user-images.githubusercontent.com/70185995/97066440-7ef7cc00-1583-11eb-8d5d-a78c4d44aaff.png">

# Link

https://ebsizzlin.github.io/WeatherDashboard/
