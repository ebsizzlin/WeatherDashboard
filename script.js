var city = $('#seachBox');
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];

$('#searchBtn').on('click', function() {
    //onclick button to show everything
    $('#forecastsAll').addClass('show');

    city = $('#searchBox').empty().val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax(    {
        url: queryURL,
        method: 'GET'
    }).then(function(response)  {

        cityList(response.name);
        locationWeather(response);
        fiveForecasts(response);
    
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
function locationWeather()  {
    var cardItem = $('<card-title>').text(city);
    console.log(cardItem);
    cardItem.addClass('h4');
    $('#currentCity').empty().append(cardItem);
    //date //timezone
    var time = $('<h4>').addClass('card-title').text(data.list[i].weather[0].timezone);
    console.log(time);
    time.empty().append(cardItem)
    //pic //icon
    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
    console.log(img);
    img.empty().append(time);
    //temp //temp
    var temp = $("<p>").addClass('card-text').text("Temperature: " + data.list[i].weather[0].temp + 'F');
    console.log(temp);
    temp.empty().append(img);
    //humidity //humidity
    var humidity = $("<p>").addClass('card-text').text('Humidity: ' + data.list[i].weather[0].humidity + '%');
    console.log(humidity);
    humidity.empty().append(temp);
    //wind speed //speed
    var wind = $("<p>").addClass('card-text').text("Wind Speed: " + data.list[i].weather[0].speed + "MPH");
    console.log(wind);
    wind.empty().append(humidity);
    //uv //notsure
    var queryURL2 = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + {lat} + '&lon=' + {lon} + '&appid=' + city + apiKey;
    $.ajax(    {
        url: queryURL2,
        method: 'GET'
    }).then(function(UV) {
        console.log(UV);
        var UV = $("<button>").addClass("btn btn-danger").text("UV Index: " + data.list[i].uvIndex[0].value);
        UV.empty().append(wind);
        console.log(uvIndex[0].value);
    }
    )};
      
//function to show 5 day forecast for selected city
function fiveForecasts()    {
    var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

    $.ajax(    {
        url: queryURL3,
        method: 'GET'
    }).then(function(response)  {

        cityList(response.name);
        locationWeather(response);
        fiveForecasts(response);
    
    }).catch(function(error)    {
        console.log(error);
    });

    var forecastItem = $('<row>').addClass('card col-md-2 ml-4 bg-primary text-white').text(data.list[i].weather[0].timezone)
    console.log(forecastItem);
    forecastItem.empty().append('#forecastsAll');
}

//look at bootstrap card in order to figure out the <li> for bootstrap to addClass for 5 forecasts
    //create a row, adding li after or is it automatic through the query ?