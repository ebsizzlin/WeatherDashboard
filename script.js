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
    var timeItem = $('<card-title>').text('timezone')
    timeItem.addClass('h4');
    cardItem.append(listItem);
    //pic //icon
    var iconItem = $('<img>').append('icon')
    iconItem.addClass('img');
    //temp //temp
    //humidity //humidity
    //wind speed //humidity
    //uv //notsure
}
      
//function to show 5 day forecast for selected city
function fiveForecasts()    {
    var forecastItem = $('<row>');
    console.log(forecastItem);
    forecastItem.addClass('card col-md-2 ml-4 bg-primary text-white');
    $('#forecasts').empty().append('#forecastsAll');
}

//look at bootstrap card in order to figure out the <li> for bootstrap to addClass for 5 forecasts