let botoesNumericos = document.querySelectorAll('.numero');
let visor = document.querySelector('.display');

let primeiroNumero = null;
let operadorSelecionado = null;
let iniciarNovoNumero = false;


botoesNumericos.forEach(function(botao){
    botao.addEventListener('click', function(){
        let valorDoBotao = botao.textContent;
        if(visor.textContent === '0' || iniciarNovoNumero){
            visor.textContent = valorDoBotao;
            iniciarNovoNumero = false;
        }else{
            visor.textContent += valorDoBotao
        }
    });
});


let btnAdicao = document.querySelector('#adicao');

btnAdicao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent); //Guarda o valor que estiver no visor
    operadorSelecionado = '+'; //Guarda o símbolo da operação que o usuário escolheu.
    iniciarNovoNumero = true; //Ao clicar no próximo número, ele deve substituir o conteúdo do visor.
});

let btnSubtracao = document.querySelector('#subtracao');
btnSubtracao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '-';
    iniciarNovoNumero = true;
});

let btnMultiplicacao = document.querySelector('#multiplicacao');
btnMultiplicacao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '*';
    iniciarNovoNumero = true;
});

let btnDivisao = document.querySelector('#divisao');
btnDivisao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '/';
    iniciarNovoNumero = true;
});

let btnIgual = document.querySelector('#igual');

btnIgual.addEventListener('click', function(){

    if(operadorSelecionado === null){
        return;
    }

    let segundoNumero = Number(visor.textContent);
    let resultado;

    if(operadorSelecionado === '+'){
        resultado = primeiroNumero + segundoNumero;
    }else if(operadorSelecionado === '-'){
        resultado = primeiroNumero - segundoNumero;
    }else if(operadorSelecionado === '*'){
        resultado = primeiroNumero * segundoNumero;
    }else if(operadorSelecionado === '/'){
        if(segundoNumero === 0){
            visor.textContent = 'Erro';
            operadorSelecionado = null;
            iniciarNovoNumero = true;
            return;
        }
        resultado = primeiroNumero / segundoNumero;
    }
    
    visor.textContent = resultado;
    operadorSelecionado = null;
    iniciarNovoNumero = true;
});