var city = $('#seachBox');
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

$('#searchBtn').on('click', function() {
    //onclick button to show everything
    $('#forecastsAll').addClass('show');

    city = $('#searchBox').empty().val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax(    {
        url: queryURL,
        method: 'GET'
    }).then(function(response)  {
        console.log(response)
        console.log(response.name)
        console.log(response.weather[0].icon)
        //temperature (weather.main.temp)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        //UV https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q="
            //lat & long, uvIndexDisplay.text(uvIndex[0].value)

        cityList();
        locationWeather(response);
        fiveForecasts(response);
    
    })

    //function to create list
    function cityList() {
        ///// $('#list-group')
    }
    
    //function to show weather for selected city
    function locationWeather()  {
        ///// $('#currentCity')
    }
          
    //function to show 5 day forecast for selected city
    function fiveForecasts()    {
        ///// $('#forecasts')
    }
})