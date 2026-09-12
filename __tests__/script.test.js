global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({})
    })
);

const {
    obtenerExchangeUrl,
    obtenerMarketUrl,
    obtenerWeatherUrl,
    realizarBusqueda
} = require("../apis_App/script.js");

describe("Pruebas de generación de URLs", () => {

    test("Genera URL de Exchange correctamente", () => {
        const resultado = obtenerExchangeUrl("EUR");

        expect(resultado).toContain("symbols=EUR");
        expect(resultado).toContain("base=USD");
    });

    test("Genera URL de Market correctamente", () => {
        const resultado = obtenerMarketUrl("AAPL");

        expect(resultado).toContain("symbols=AAPL");
    });

    test("Genera URL de Weather correctamente", () => {
        const resultado = obtenerWeatherUrl("Mexico");

        expect(resultado).toContain("query=Mexico");
    });
});

describe("Prueba de búsqueda", () => {

    beforeEach(() => {

        global.cargarWeather = jest.fn();
        global.cargarMarket = jest.fn();
        global.cargarExchange = jest.fn();

    });

    test("Realizar búsqueda llama las funciones adecuadas", () => {

        realizarBusqueda("eur");

        expect(cargarWeather).toHaveBeenCalledWith("eur");
        expect(cargarMarket).toHaveBeenCalledWith("EUR");
        expect(cargarExchange).toHaveBeenCalledWith("EUR");

    });

});