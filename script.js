var city = $('#seachBox');
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];
var timeNow = moment().format('M/D/YYYY');

$('#searchBtn').on('click', function() {
    //onclick button to show everything
    $('#forecastsAll').addClass('show');
    $('#forecast-cards').addClass('show');

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
    $('#currentCity').css('border', '1px solid black');

    var cardItem = $('<card-title>').addClass('h4').text(city);
    console.log(cardItem);
    $('#currentCity').empty().append(cardItem);

    //date //date
    var time = $('<h4>').addClass('card-title').text('(' + timeNow + ')');
    console.log('timeNow:', timeNow)
    $(cardItem).append(time);

    //pic //icon
    var img = $("<img>").css('margin-left', '20px').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    console.log('data.weather[0].icon:', data.weather[0].icon)
    $(time).append(img);

    //temp //temp
    var temp = $("<p>").addClass('card-text').css('margin-left', '20px').text("Temperature: " + data.main.temp + 'F');
    console.log('data.main.temp:', data.main.temp)
    $('#currentCity').append(temp);

    //humidity //humidity
    var humidity = $("<p>").addClass('card-text').css('margin-left', '20px').text('Humidity: ' + data.main.humidity + '%');
    console.log('data.main.humidity:', data.main.humidity)
    $('#currentCity').append(humidity);

    //wind speed //speed
    var wind = $("<p>").addClass('card-text').css('margin-left', '20px').text("Wind Speed: " + data.wind.speed + "MPH");
    console.log('data.wind.speed:', data.wind.speed)
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
        var index = $('<p>').addClass('card-text').css('margin-left', '20px').text("UV Index: ");
        var UV = $("<button>").addClass('btn btn-success').text(response.value);
        $('#currentCity').append(index);
        $(index).append(UV);
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
        console.log('response.list[0](LINE103):', response.list[0])    // forecastItem.empty(response);
        console.log(response, 'response');

        var forecastItem1 = $('#forecast1').addClass("bg-primary text-white");
            console.log(forecastItem1);
                var day1 = $('#date1').addClass('h4').text(response.list[3].dt_txt).html(timeNow);
                console.log('response.list[3].dt_txt:', response.list[3].dt_txt)
                forecastItem1.append(day1);
                var icon1 = $("#icon1").attr("src", "https://openweathermap.org/img/w/" + response.list[3].weather.icon + ".png");
                console.log('response.list[3].weather.icon:', response.list[3].weather.icon)
                forecastItem1.append(icon1);
                var temp1 = $("#temp1").text("Temperature: " + response.list[3].main.temp + 'F');
                console.log('response.list[3].main.temp:', response.list[3].main.temp)
                forecastItem1.append(temp1);
                var humidity1 = $("#humidity1").text('Humidity: ' + response.list[3].main.humidity + '%');
                console.log('response.list[3].main.humidity:', response.list[3].main.humidity)
                forecastItem1.append(humidity1);

        var forecastItem2 = $('#forecast2').addClass("bg-primary text-white");
            console.log(forecastItem2);
                var day2 = $('#date2').addClass('h4').text(response.list[11].dt_txt).html(timeNow);
                console.log('response.list[11].dt_txt:', response.list[11].dt_txt)
                forecastItem2.append(day2);
                var icon2 = $("#icon2").attr("src", "https://openweathermap.org/img/w/" + response.list[11].weather.icon + ".png");
                console.log('response.list[11].weather.icon:', response.list[11].weather.icon)
                forecastItem2.append(icon2);
                var temp2 = $("#temp2").text("Temperature: " + response.list[11].main.temp + 'F');
                console.log('response.list[11].main.temp:', response.list[11].main.temp)
                forecastItem2.append(temp2);
                var humidity2 = $("#humidity2").text('Humidity: ' + response.list[11].main.humidity + '%');
                console.log('response.list[11].main.humidity:', response.list[11].main.humidity)
                forecastItem2.append(humidity2);

        var forecastItem3 = $('#forecast3').addClass("bg-primary text-white");
            console.log(forecastItem3);
                var day3 = $('#date3').addClass('h4').text(response.list[19].dt_txt).html(timeNow);
                console.log('response.list[19].dt_txt:', response.list[19].dt_txt)
                forecastItem3.append(day3);
                var icon3 = $("#icon2").attr("src", "https://openweathermap.org/img/w/" + response.list[19].weather.icon + ".png");
                console.log('response.list[19].weather.icon:', response.list[19].weather.icon)
                forecastItem3.append(icon3);
                var temp3 = $("#temp3").text("Temperature: " + response.list[19].main.temp + 'F');
                console.log('response.list[19].main.temp:', response.list[19].main.temp)
                forecastItem3.append(temp3);
                var humidity3 = $("#humidity3").text('Humidity: ' + response.list[19].main.humidity + '%');
                console.log('response.list[19].main.humidity:', response.list[19].main.humidity)
                forecastItem3.append(humidity3);

        var forecastItem4 = $('#forecast4').addClass("bg-primary text-white");
            console.log(forecastItem4);
                var day4 = $('#date4').addClass('h4').text(response.list[27].dt_txt).html(timeNow);
                console.log('response.list[27].dt_txt:', response.list[27].dt_txt)
                forecastItem4.append(day4);
                var icon4 = $("#icon4").attr("src", "https://openweathermap.org/img/w/" + response.list[27].weather.icon + ".png");
                console.log('response.list[27].weather.icon:', response.list[27].weather.icon)
                forecastItem4.append(icon4);
                var temp4 = $("#temp4").text("Temperature: " + response.list[27].main.temp + 'F');
                console.log('response.list[27].main.temp:', response.list[27].main.temp)
                forecastItem4.append(temp4);
                var humidity4 = $("#humidity4").text('Humidity: ' + response.list[27].main.humidity + '%');
                console.log('response.list[27].main.humidity:', response.list[27].main.humidity)
                forecastItem4.append(humidity4);

        var forecastItem5 = $('#forecast5').addClass("bg-primary text-white");
            console.log(forecastItem4);
                var day5 = $('#date5').addClass('h4').text(response.list[35].dt_txt).html(timeNow);
                console.log('response.list[35].dt_txt:', response.list[35].dt_txt)
                forecastItem5.append(day5);
                var icon5 = $("#icon5").attr("src", "https://openweathermap.org/img/w/" + response.list[35].weather.icon + ".png");
                console.log('response.list[35].weather.icon:', response.list[35].weather.icon)
                forecastItem5.append(icon5);
                var temp5 = $("#temp5").text("Temperature: " + response.list[35].main.temp + 'F');
                console.log('response.list[35].main.temp:', response.list[35].main.temp)
                forecastItem5.append(temp5);
                var humidity5 = $("#humidity5").text('Humidity: ' + response.list[35].main.humidity + '%');
                console.log('response.list[35].main.humidity:', response.list[35].main.humidity)
                forecastItem5.append(humidity5);
    });
};