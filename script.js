//função para evitar que o formulário seja enviado para não perder o processo
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    //função para pegar o que o usuário digitou
    let input = document.querySelector('#searchInput').value;
    
    //condição para ver se o usuário digitou alguma coisa
    if(input !== '') {
        //clearInfo('');
        showWarning('Carregando...');

        //a url da requisição
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=4018f036b662d05559b4bbaf75b6bab9&units=metric&lang=pt_br`;

        //fazendo a culsulta á api
        let results = await fetch(url);
        //transformando em json
        let json = await results.json();
        
        // condição se achaou a cidade que o usuário está procurando
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Não encontramos esse localização.');
        }
    }else {

    }

});

//função para preencher as informções que vem no json
function showInfo(json) {
    showWarning('');
    
    //mostrando resultados na tela
    document.querySelector('.resultado').style.display = 'block';

    //preenchendoi os resultados
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    //mudando o icone
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    //mudando a rotação do vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}

//função que vai limpar a tela
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

//função para acessar os avisos
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}




//minha chave key do clima: 4018f036b662d05559b4bbaf75b6bab9
