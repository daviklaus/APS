const key = "271b8ef2e5dbf0ffb7efb98dd4c2bbef"

function insertdata(dados){
    console.log(dados)
    document.querySelector(".title-city"). innerHTML = "Tempo em "+ dados.name
    document.querySelector(".title-temp"). innerHTML = Math.floor(dados.main.temp) + "ºC"
    document.querySelector(".title-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".title-umidade").innerHTML = "Umidade: "+ dados.main.humidity + "%"
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

}

async function buscarCidade(cidade){

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    insertdata(dados)
}

function clickNoBotao() {
    const cidade = document.querySelector(".input-textcity").value


    buscarCidade(cidade)
    
}

