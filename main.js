const keyOpenWeather = "271b8ef2e5dbf0ffb7efb98dd4c2bbef";
const keyAirVisual = "b76375dd-6f6b-4e88-b983-fb76855bbf50";

async function insertdataOpenWeather(dados) {
    console.log(dados);
    document.querySelector(".title-city").innerHTML = `Tempo em ${dados.name} - ${dados.sys.country}`;
    document.querySelector(".title-temp").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".title-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".title-umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function insertdataAirVisual(dados) {
    document.querySelector(".poluition").innerHTML = "Nível de poluição próximo a você: " + dados.data.current.pollution.aqicn;
    
    // Categoria do AQI
    const aqi = dados.data.current.pollution.aqicn;
    const categoriaAQI = categorizarAQI(aqi);
    document.querySelector(".poluition-disc").innerHTML = `Descrição: ${categoriaAQI}`;
}

async function buscarDados(cidade, apiKeyOpenWeather, apiKeyAirVisual) {
    try {
        // Chamada para OpenWeather
        const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKeyOpenWeather}&lang=pt_br&units=metric`;
        const responseOpenWeather = await fetch(urlOpenWeather);
        const dataOpenWeather = await responseOpenWeather.json();
        insertdataOpenWeather(dataOpenWeather);

        // Chamada para AirVisual
        const urlAirVisual = `https://api.airvisual.com/v2/nearest_city?key=${apiKeyAirVisual}`;
        const responseAirVisual = await fetch(urlAirVisual);
        const dataAirVisual = await responseAirVisual.json();
        insertdataAirVisual(dataAirVisual);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function categorizarAQI(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return 'Você está em uma área com uma excelente qualidade do ar. A qualidade do ar é boa para a saúde e não representa riscos.';
    } else if (aqi >= 51 && aqi <= 100) {
        return 'A qualidade do ar é aceitável, mas pode afetar pessoas sensíveis. Não há necessidade de precauções.';
    } else if (aqi >= 101 && aqi <= 150) {
        return 'A qualidade do ar é aceitável; no entanto, pode ser prejudicial para pessoas sensíveis, como crianças e idosos.';
    } else if (aqi >= 151 && aqi <= 200) {
        return 'A qualidade do ar é ruim. Pode afetar a saúde de todos, especialmente grupos sensíveis. Evite atividades ao ar livre.';
    } else if (aqi >= 201 && aqi <= 300) {
        return 'A qualidade do ar é muito ruim. A exposição prolongada pode ter efeitos prejudiciais à saúde. Evite atividades ao ar livre e use máscaras de proteção.';
    } else if (aqi >= 301 && aqi <= 500) {
        return 'A qualidade do ar é perigosa e representa um risco grave para a saúde. Evite sair de casa e tome medidas de proteção.';
    } else {
        return 'Valor de AQI inválido - O valor do Índice de Qualidade do Ar (AQI) não é válido ou está fora do intervalo aceitável.';
    }
}


function clickNoBotao() {
    const cidade = document.querySelector(".input-textcity").value;
    buscarDados(cidade, keyOpenWeather, keyAirVisual);
}
