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
    listItem.addClass('list-group-item');
    $('#cityList').append(listItem);
    searchHistory.push(city);
    window.localStorage.setItem('history', JSON.stringify(searchHistory));
}

//function to show weather for selected city
function locationWeather(data)  {
    $('#currentCity').css('border', '1px solid black');

    var cardItem = $('<card-title>').addClass('h2').text(city);
    $('#currentCity').empty().append(cardItem);

    //date //date
    var time = $('<h2>').addClass('card-title').text('(' + timeNow + ')');
    $(cardItem).append(time);

    //pic //icon
    var img = $("<img>").css('margin-left', '20px').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    $(time).append(img);

    //temp //temp
    var F = (data.main.temp - 273.15) * 1.80 + 32;
    F = Math.floor(F);

    var temp = $("<p>").addClass('card-text').css('margin-left', '20px').text("Temperature: " + F + 'F');
    $('#currentCity').append(temp);

    //humidity //humidity
    var humidity = $("<p>").addClass('card-text').css('margin-left', '20px').text('Humidity: ' + data.main.humidity + '%');
    $('#currentCity').append(humidity);

    //wind speed //speed
    var wind = $("<p>").addClass('card-text').css('margin-left', '20px').text("Wind Speed: " + data.wind.speed + "MPH");
    $('#currentCity').append(wind);
    
    //uv //value
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    var queryURL2 = 'https://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + lat + '&lon=' + lon;

    $.ajax(    {
        url: queryURL2,
        method: 'GET'
    }).then(function(response) {
        var UVindex = response.value; //added variable for response.value so there's something to call instead of using "this" because "this" had no element to reference in if statements
        var index = $('<p>').addClass('card-text').css('margin-left', '20px').text("UV Index: ");
        var UV = $("<button>").addClass('btn btn-success').text(UVindex);
        $('#currentCity').append(index);
        //if ... btn btn-success //if ... btn btn-warning //if ... btn btn-danger
        if (UVindex <= 2) {
            UV.addClass("btn btn-success");
            UV.removeClass("btn btn-warning");
            UV.removeClass("btn btn-danger");
        } else if (UVindex >= 3 && UVindex <= 7) {
            UV.addClass("btn btn-warning");
            UV.removeClass("btn btn-success");
            UV.removeClass("btn btn-danger");
        } else if (UVindex >= 8) {
            UV.addClass("btn btn-danger");
            UV.removeClass("btn btn-success");
            UV.removeClass("btn btn-warning");
        }
        $(index).append(UV);
    });
};
      
//function to show 5 day forecast for selected city
function fiveForecasts()    {
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    $.ajax(    {
        url: queryURL3,
        method: 'GET'
    }).then(function(response)  {

        var forecastItem1 = $('#forecast1').addClass("bg-primary text-white");
                //date
                var day1 = $('#date1').addClass('h4').text(response.list[3].dt_txt).html(timeNow);
                    forecastItem1.append(day1);
                //icon
                var icon1 = $("#icon1").attr("src", "https://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png");
                forecastItem1.append(icon1);
                //temp
                var F1 = (response.list[3].main.temp - 273.15) * 1.80 + 32;
                    F1 = Math.floor(F1);
                    var temp1 = $("#temp1").text("Temperature: " + F1 + 'F');
                        forecastItem1.append(temp1);
                //humidity
                var humidity1 = $("#humidity1").text('Humidity: ' + response.list[3].main.humidity + '%');
                    forecastItem1.append(humidity1);

        var forecastItem2 = $('#forecast2').addClass("bg-primary text-white");
                //date
                var day2 = $('#date2').addClass('h4').text(response.list[11].dt_txt).html(timeNow);
                    forecastItem2.append(day2);
                //icon
                var icon2 = $("#icon2").attr("src", "https://openweathermap.org/img/w/" + response.list[11].weather[0].icon + ".png");
                    forecastItem2.append(icon2);
                //temp
                var F2 = (response.list[11].main.temp - 273.15) * 1.80 + 32;
                    F2 = Math.floor(F2);
                    var temp2 = $("#temp2").text("Temperature: " + F2 + 'F');
                        forecastItem2.append(temp2);
                //humidity
                var humidity2 = $("#humidity2").text('Humidity: ' + response.list[11].main.humidity + '%');
                    forecastItem2.append(humidity2);

        var forecastItem3 = $('#forecast3').addClass("bg-primary text-white");
                //date
                var day3 = $('#date3').addClass('h4').text(response.list[19].dt_txt).html(timeNow);
                    forecastItem3.append(day3);
                //icon
                var icon3 = $("#icon3").attr("src", "https://openweathermap.org/img/w/" + response.list[19].weather[0].icon + ".png");
                    forecastItem3.append(icon3);
                //temp
                var F3 = (response.list[19].main.temp - 273.15) * 1.80 + 32;
                    F3 = Math.floor(F3);
                    var temp3 = $("#temp3").text("Temperature: " + F3 + 'F');
                        forecastItem3.append(temp3);
                //humidity
                var humidity3 = $("#humidity3").text('Humidity: ' + response.list[19].main.humidity + '%');
                    forecastItem3.append(humidity3);

        var forecastItem4 = $('#forecast4').addClass("bg-primary text-white");
                //date
                var day4 = $('#date4').addClass('h4').text(response.list[27].dt_txt).html(timeNow);
                    forecastItem4.append(day4);
                //icon
                var icon4 = $("#icon4").attr("src", "https://openweathermap.org/img/w/" + response.list[27].weather[0].icon + ".png");
                    forecastItem4.append(icon4);
                //temp
                var F4 = (response.list[27].main.temp - 273.15) * 1.80 + 32;
                    F4 = Math.floor(F4);
                    var temp4 = $("#temp4").text("Temperature: " + F4 + 'F');
                        forecastItem4.append(temp4);
                //humidity
                var humidity4 = $("#humidity4").text('Humidity: ' + response.list[27].main.humidity + '%');
                    forecastItem4.append(humidity4);

        var forecastItem5 = $('#forecast5').addClass("bg-primary text-white");
                //date
                var day5 = $('#date5').addClass('h4').text(response.list[35].dt_txt).html(timeNow);
                    forecastItem5.append(day5);
                //icon
                var icon5 = $("#icon5").attr("src", "https://openweathermap.org/img/w/" + response.list[35].weather[0].icon + ".png");
                    forecastItem5.append(icon5);
                //temp
                var F5 = (response.list[35].main.temp - 273.15) * 1.80 + 32;
                    F5 = Math.floor(F5);
                    var temp5 = $("#temp5").text("Temperature: " + F5 + 'F');
                        forecastItem5.append(temp5);
                //humidity
                var humidity5 = $("#humidity5").text('Humidity: ' + response.list[35].main.humidity + '%');
                    forecastItem5.append(humidity5);
    });
};