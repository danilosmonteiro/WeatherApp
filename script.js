$(document).ready(function(){
  // Inicia com a previsao por Geo IP, sem passar as coordenadas
  atualizarDados();
  
  // Quando o usuario clicar no botao, obtem os dados de geolocalizacao do navegador.
  $('#obter-localizacao').on('click', function(){
    
    // Verifica se o navegador do usuario tem suporte a geolocalizacao
    if(navigator.geolocation){
      // Se tiver, solicita os dados e atualiza a previsao do tempo pela API
      navigator.geolocation.getCurrentPosition(atualizarDados);
    } else {
      alert('Seu navegador não suporta geolocalização.');
    }
  });
  
});

function atualizarDados(localizacao) {
  localizacao = typeof localizacao !== 'undefined' ? localizacao : false;
  
  //alert(localizacao);
  
  $.ajax({
    url: 'tempo.php'+(!localizacao ? '' : '?lat='+localizacao.coords.latitude+'&lon='+localizacao.coords.longitude),
    dataType: 'json',
    success: function(dados) {
      $('.day').html(diasemana())
      $('.cidade').html(dados.cidade)
      $('.descricao').html(dados.descricao)
      $('.imagem').html(dados.imagem)
      $('.temperatura').html(dados.temperatura)
      $('.umidade').html(dados.umidade)
      $('.dia').html(dados.dia)
      $('.vento').html(dados.vento)
      // Loop inserindo os dados no HTML
      var previsao = '';
      var teste = dados.previsao.length;
      $.each(dados.previsao, function(key, value){
        if(key == teste - 4) {
          return false;
        }
          previsao += '<div class="forecast">' +
                      '<div class="forecast-header">' +
                        '<div class="day">' + value.weekday + '</div>' +
                      '</div>' +
                      '<div class="forecast-content">' +
                        '<div class="forecast-icon">' +
                          '<img src="images/icons/icon-3.svg" alt="" width=48>' +
                        '</div>' +
                        '<div class="degree"> ' + value.max + '<sup>o</sup>C</div>' +
                        '<small>min ' + value.min + '<sup>o</sup></small>' +
                      '</div>' +
                    '</div>';
      });
      $('#today-forecast').append(previsao);
      
      // Insere a imagem
      $('.imagem-do-tempo').attr('src', dados.imagem);
    }
  });
  
}

function diasemana(){
  var hoje = new Date();
  var dia = hoje.getDay();
  var semana = new Array(6);
  semana[0]='Domingo';
  semana[1]='Segunda-Feira';
  semana[2]='Terça-Feira';
  semana[3]='Quarta-Feira';
  semana[4]='Quinta-Feira';
  semana[5]='Sexta-Feira';
  semana[6]='Sábado';
  
  return semana[dia];
}