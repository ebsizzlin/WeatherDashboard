var city = $('#seachBox');
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];
var timeNow = moment().format('M/D/YYYY');

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
function locationWeather(data)  {
    var cardItem = $('<card-title>').addClass('h4').text(city);
    console.log(cardItem);
    $('#currentCity').empty().append(cardItem);

    //date //date
    var time = $('<h4>').addClass('card-title').text(timeNow);
    console.log(time, 'time');
    $(cardItem).append(time);

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
        var UV = $("<button>").addClass('btn btn-success').text("UV Index: " + response.value);
        $('#currentCity').append(UV);
        //if ... btn btn-success //if ... btn btn-warning //if ... btn btn-danger
        if (response.value <= 2) {
            $(this).addClass("btn btn-success");
          } else if (response.value >= 3 && response.value <= 7) {
            $(this).addClass("btn btn-warning");
          } else if (response.value >= 8) {
            $(this).addClass("btn btn-danger");
          }
    });
};
      
//function to show 5 day forecast for selected city
function fiveForecasts()    {
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    $.ajax(    {
        url: queryURL3,
        method: 'GET'
    }).then(function(response)  {
    console.log('response:', response)
    // forecastItem.empty(response);
    });

    //should i be appending to forecastItem1 instead of #forecasts?
    // for(var i = 0; i < response.length; i++)    {
        $(".card").attr(
            "style",
            "background-color:dodgerblue; color:white"
          );

        var forecastItem1 = $('#forecast1');
            console.log(forecastItem1);
                var day1 = $('#date1').addClass('h4').text(timeNow.response.list[0]);
                console.log(day1, 'day1');
                forecastItem1.append(day1);
                var icon1 = $("icon1").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather.icon + ".png");
                console.log(icon1, 'icon1');
                forecastItem1.append(icon1);
                var temp1 = $("#temp1").text("Temperature: " + response.list[0].main.temp + 'F');
                console.log(temp1, 'temp1');
                forecastItem1.append(temp1);
                var humidity1 = $("#humidity1").text('Humidity: ' + response.list[0].main.humidity + '%');
                console.log(humidity1, 'humidity1');
                forecastItem1.append(humidity1);
    // }

    // var forecastItem2 = $('<card>').addClass('card col-md-2 ml-4 bg-primary text-white')
    //     console.log(forecastItem2);
    //     $('#forecasts').append(forecastItem2);
    //         var day2 = $('<card-title>').addClass('h4').text(list[1].dt_txt);
    //         console.log(day2, 'day2');
    //         $('#forecasts').append(day2);
    //         var icon2 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + list[1].weather.icon + ".png");
    //         console.log(icon2, 'icon2');
    //         $('#forecasts').append(icon2);
    //         var temp2 = $("<p>").addClass('card-text').text("Temperature: " + list[1].main.temp + 'F');
    //         console.log(temp2, 'temp2');
    //         $('#forecasts').append(temp2);
    //         var humidity2 = $("<p>").addClass('card-text').text('Humidity: ' + list[1].main.humidity + '%');
    //         console.log(humidity2, 'humidity2');
    //         $('#forecasts').append(humidity2);

    // var forecastItem3 = $('<card>').addClass('card col-md-2 ml-4 bg-primary text-white')
    //     console.log(forecastItem3);
    //     $('#forecasts').append(forecastItem3);
    //         var day3 = $('<card-title>').addClass('h4').text(list[2].dt_txt);
    //         console.log(day3, 'day3');
    //         $('#forecasts').append(day3);
    //         var icon3 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + list[2].weather.icon + ".png");
    //         console.log(icon3, 'icon3');
    //         $('#forecasts').append(icon3);
    //         var temp3 = $("<p>").addClass('card-text').text("Temperature: " + list[2].main.temp + 'F');
    //         console.log(temp3, 'temp3');
    //         $('#forecasts').append(temp3);
    //         var humidity3 = $("<p>").addClass('card-text').text('Humidity: ' + list[2].main.humidity + '%');
    //         console.log(humidity3, 'humidity3');
    //         $('#forecasts').append(humidity3);

    // var forecastItem4 = $('<card>').addClass('card col-md-2 ml-4 bg-primary text-white')
    //     console.log(forecastItem4);
    //     $('#forecasts').append(forecastItem4);
    //         var day4 = $('<card-title>').addClass('h4').text(list[3].dt_txt);
    //         console.log(day4, 'day4');
    //         $('#forecasts').append(day4);
    //         var icon4 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + list[3].weather.icon + ".png");
    //         console.log(icon4, 'icon4');
    //         $('#forecasts').append(icon4);
    //         var temp4 = $("<p>").addClass('card-text').text("Temperature: " + list[3].main.temp + 'F');
    //         console.log(temp4, 'temp4');
    //         $('#forecasts').append(temp4);
    //         var humidity4 = $("<p>").addClass('card-text').text('Humidity: ' + list[3].main.humidity + '%');
    //         console.log(humidity4, 'humidity4');
    //         $('#forecasts').append(humidity4);

    // var forecastItem5 = $('<card>').addClass('card col-md-2 ml-4 bg-primary text-white')
    //     console.log(forecastItem5);
    //     $('#forecasts').append(forecastItem5);
    //         var day5 = $('<card-title>').addClass('h4').text(list[4].dt_txt);
    //         console.log(day5, 'day5');
    //         $('#forecasts').append(day5);
    //         var icon5 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + list[4].weather.icon + ".png");
    //         console.log(icon5, 'icon5');
    //         $('#forecasts').append(icon5);
    //         var temp5 = $("<p>").addClass('card-text').text("Temperature: " + list[4].main.temp + 'F');
    //         console.log(temp5, 'temp5');
    //         $('#forecasts').append(temp5);
    //         var humidity5 = $("<p>").addClass('card-text').text('Humidity: ' + list[4].main.humidity + '%');
    //         console.log(humidity5, 'humidity5');
    //         $('#forecasts').append(humidity5);

};