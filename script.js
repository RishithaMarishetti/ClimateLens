const apiKey =
"fe088f86cf42c8d6ac2c9d5efd2199ba";

let chart;

async function getWeather() {

    const city =
    document
    .getElementById("cityInput")
    .value
    .trim();

    if(city === "") {

        alert("Enter city name");
        return;
    }

 const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response =
        await fetch(url);

        const data =
        await response.json();

        console.log(data);

        if(data.cod != 200){

            alert("City not found");
            return;
        }

        const temp =
        data.main.temp;

        const humidity =
        data.main.humidity;

        const wind =
        data.wind.speed;

        const condition =
        data.weather[0].main;

        document
        .getElementById("cityName")
        .innerText =
city.charAt(0).toUpperCase()
+ city.slice(1);

        document
        .getElementById("temp")
        .innerText =
        temp;

        document
        .getElementById("humidity")
        .innerText =
        humidity;

        document
        .getElementById("wind")
        .innerText =
        wind;

        document
        .getElementById("condition")
        .innerText =
        condition;

        updateChart(
            temp,
            humidity,
            wind
        );

    }

   catch(error){

    console.log(error);

    alert(error);
}
}

function updateChart(
    temp,
    humidity,
    wind
){

    const ctx =
    document.getElementById(
        "weatherChart"
    );

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type:'bar',

        data:{

            labels:[
                'Temperature',
                'Humidity',
                'Wind Speed'
            ],

            datasets:[{

                label:
                'Weather Analytics',

                data:[
                    temp,
                    humidity,
                    wind
                ],

                backgroundColor:[
                    '#38bdf8',
                    '#22c55e',
                    '#f97316'
                ],

                borderRadius:10
            }]
        },

        options:{
            responsive:true
        }
    });
}