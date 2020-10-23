var city = $('#seachBox');
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];

$('#searchBtn').on('click', function() {
    //onclick button to show everything
    $('#forecastsAll').addClass('show');

    city = $('#searchBox').empty().val().trim().toUpperCase();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax(    {
        url: queryURL,
        method: 'GET'
    }).then(function(response)  {
    // console.log('response:', response)

        cityList(response.name);
        locationWeather(response);
        // fiveForecasts(response);
    
    }).catch(function(error)    {
        console.log(error);
    });
})

//function to create list (search history)
function cityList(city) {
    var listItem = $('<li>').text(city);
    console.log(listItem);
    listItem.addClass('list-group-item');
    $('#cityList').append(listItem);
    console.log(history);
    searchHistory.push(city);
    window.localStorage.setItem('history', JSON.stringify(searchHistory));
}

//function to show weather for selected city
function locationWeather(data)  {
    var cardItem = $('<card-title>').addClass('h4').text(city);
    console.log(cardItem);
    $('#currentCity').empty().append(cardItem);
    //date //uv date
    // var time = $('<h4>').addClass('card-title').attr(response.date);
    // console.log(time);
    // $('#currentCity').append(time);
    //pic //icon
    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    console.log(img);
    $('#currentCity').append(img);
    //temp //temp
    var temp = $("<p>").addClass('card-text').text("Temperature: " + data.main.temp + 'F');
    console.log(temp, 'temp');
    $('#currentCity').append(temp);
    //humidity //humidity
    var humidity = $("<p>").addClass('card-text').text('Humidity: ' + data.main.humidity + '%');
    console.log(humidity, 'humidity');
    $('#currentCity').append(humidity);
    //wind speed //speed
    var wind = $("<p>").addClass('card-text').text("Wind Speed: " + data.wind.speed + "MPH");
    console.log(wind);
    $('#currentCity').append(wind);

    
    //uv //value
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    var queryURL2 = 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + lat + '&lon=' + lon;

    $.ajax(    {
        url: queryURL2,
        method: 'GET'
    }).then(function(response) {
        // console.log('response:', response)
        var UV = $("<button>").addClass("btn btn-danger").text("UV Index: " + response.value);
        $('#currentCity').append(UV);
    });
};
      
//function to show 5 day forecast for selected city
function fiveForecasts()    {
    var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey;

    $.ajax(    {
        url: queryURL3,
        method: 'GET'
    }).then(function(response)  {
    console.log('response:', response)
    forecastItem.empty();

    for(var i = 0; i < response.length; i++)    {
        var forecastItem = $('<row>').addClass('card col-md-2 ml-4 bg-primary text-white').text(data.list[i].weather[0].timezone)
        console.log(forecastItem);
        $('#forecasts').append(forecastItem);
    }
    });
};

//look at bootstrap card in order to figure out the <li> for bootstrap to addClass for 5 forecasts
    //create a row, adding li after or is it automatic through the query?