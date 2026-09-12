function obtenerExchangeUrl(moneda) {
    return `https://api.exchangerate.host/live?access_key=0cdbca084cac5471820cde1b78f1e5ae&base=USD&symbols=${moneda}`;
}

function obtenerMarketUrl(simbolo) {
    return `http://api.marketstack.com/v1/eod?access_key=165c79f00f9716abd5789423679e9aea&symbols=${simbolo}`;
}

function obtenerWeatherUrl(ciudad) {
    return `http://api.weatherstack.com/current?access_key=6edf3eb29af83609dc2ac72b000110a3&query=${ciudad}`;
}

function cargarExchange(moneda) {

    fetch(obtenerExchangeUrl(moneda))
        .then(response => response.json())
        .then(data => {

            const contenedor =
                document.getElementById("exchange-res");

            const clave = `USD${moneda}`;

            if (!data.quotes || !data.quotes[clave]) {

                contenedor.innerHTML =
                    "<p class='text-danger'>Moneda no encontrada.</p>";

                return;
            }

            contenedor.innerHTML = `
                <h5>USD → ${moneda}</h5>
                <p>Tipo de cambio: ${data.quotes[clave]}</p>
            `;
        });
}

function cargarMarket(simbolo) {

    fetch(obtenerMarketUrl(simbolo))
        .then(response => response.json())
        .then(data => {

            const contenedor =
                document.getElementById("market-res");

            if (!data.data || data.data.length === 0) {

                contenedor.innerHTML =
                    "<p class='text-danger'>Acción no encontrada.</p>";

                return;
            }

            const stock = data.data[0];

            contenedor.innerHTML = `
                <h5>${stock.symbol}</h5>
                <p>Cierre: $${stock.close}</p>
                <p>Máximo: $${stock.high}</p>
                <p>Mínimo: $${stock.low}</p>
            `;
        });
}

function cargarWeather(ciudad) {

    fetch(obtenerWeatherUrl(ciudad))
        .then(response => response.json())
        .then(data => {

            const contenedor =
                document.getElementById("weather-res");

            if (!data.current) {
                contenedor.innerHTML =
                    "<p class='text-danger'>Ciudad no encontrada.</p>";
                return;
            }

            contenedor.innerHTML = `
                <h5>${data.location.name}</h5>
                <p>Temperatura: ${data.current.temperature} °C</p>
                <p>Humedad: ${data.current.humidity}%</p>
                <p>Viento: ${data.current.wind_speed} km/h</p>
            `;
        });
}

function realizarBusqueda(termino) {
    cargarWeather(termino);
    cargarMarket(termino.toUpperCase());
    cargarExchange(termino.toUpperCase());
}

document.addEventListener("DOMContentLoaded", () => {

    cargarExchange("EUR");
    cargarMarket("AAPL");
    cargarWeather("New York");

    const formulario = document.getElementById("searchForm");

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const termino =
            document.getElementById("searchInput").value.trim();

        if (!termino) {
            return;
        }

        realizarBusqueda(termino);
    });

});