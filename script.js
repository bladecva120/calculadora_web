let botoesNumericos = document.querySelectorAll('.numero');
let visor = document.querySelector('.display');
let historico = document.querySelector('#historico');


let primeiroNumero = null;
let operadorSelecionado = null;
let iniciarNovoNumero = false;


let memoria = 0;

/* ============================== BOTÕES NUMÉRICOS ============================*/
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

/* ============================== BOTÃO ADIÇÃO ============================*/
let btnAdicao = document.querySelector('#adicao');

btnAdicao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent); //Guarda o valor que estiver no visor
    operadorSelecionado = '+'; //Guarda o símbolo da operação que o usuário escolheu.
    iniciarNovoNumero = true; //Ao clicar no próximo número, ele deve substituir o conteúdo do visor.
});


/* ============================== BOTÃO SUBTRAÇÃO ============================*/
let btnSubtracao = document.querySelector('#subtracao');

btnSubtracao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '-';
    iniciarNovoNumero = true;
});


/* ============================== BOTÃO MULTIPLICAÇÃO ============================*/
let btnMultiplicacao = document.querySelector('#multiplicacao');

btnMultiplicacao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '*';
    iniciarNovoNumero = true;
});


/* ============================== BOTÃO DIVISÃO ============================*/
let btnDivisao = document.querySelector('#divisao');

btnDivisao.addEventListener('click', function(){
    primeiroNumero = Number(visor.textContent);
    operadorSelecionado = '/';
    iniciarNovoNumero = true;
});

/* =========================== BOTÃO IGUALDADE ===========================*/
let btnIgual = document.querySelector('#igual');

btnIgual.addEventListener('click', function(){

    if(operadorSelecionado === null){
        return;
    }
    if(iniciarNovoNumero){
        return;
    }

    let segundoNumero = Number(visor.textContent);
    let resultado;


    if(operadorSelecionado === '+'){
        resultado = primeiroNumero + segundoNumero;
        memoriaHistorico = (`${primeiroNumero} + ${segundoNumero} = ${resultado}`)
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
        resultado = (primeiroNumero / segundoNumero).toFixed(2);
    }

    let simboloHistorico = operadorSelecionado;

    if(simboloHistorico === '*'){
        simboloHistorico = 'x';
    }else if(simboloHistorico === '/'){
        simboloHistorico = '÷';
    }else if(simboloHistorico === '-'){
        simboloHistorico = '-'
    }

    let registro = document.createElement('p');

    registro.textContent = `
        ${primeiroNumero} ${simboloHistorico} ${segundoNumero} = ${resultado}`;

    if(historico.textContent.trim() === 'No calculations yet'){
        historico.textContent = '';
    }

    historico.prepend(registro);

    visor.textContent = resultado;
    operadorSelecionado = null; // Elas ajudam a encerrar a operação atual
    iniciarNovoNumero = true; // e preparar a calculadora para a próxima entrada.    
});

/* ========================= BOTÃO CE ===============================*/
let btnCE = document.querySelector('#ce');

btnCE.addEventListener('click', function(){
    visor.textContent = '0';
    iniciarNovoNumero = true;
});

/* ========================= BOTÃO BACKSPACE =========================*/
let btnBackSpace = document.querySelector('#backSpace');

btnBackSpace.addEventListener('click', function(){

    if(iniciarNovoNumero){
        return;
    }

    let valorAtual = visor.textContent;
    let novoValor = valorAtual.slice(0, -1);
    if(novoValor === '' || novoValor === '-'){
        novoValor = '0';
    }
    visor.textContent = novoValor;
});

/* ========================= BOTÃO AC ===============================*/
let btnAC = document.querySelector('#ac');

btnAC.addEventListener('click', function(){
    visor.textContent = '0';
    primeiroNumero = null;
    operadorSelecionado = null;
    iniciarNovoNumero = false;
});

/* ======================== BOTÃO PONTO ============================*/
let btnPonto = document.querySelector('#ponto');

btnPonto.addEventListener('click', function(){
    //Quando "iniciarNovoNumero" está como true, significa que a calculadora está preparada para receber uma nova entrada. Isso ocorre, por exemplo, depois que você pressiona +.
    if(iniciarNovoNumero){
        visor.textContent = '0.';
        iniciarNovoNumero = false;
        return;
    }
    if(!visor.textContent.includes('.')){ // se ainda não existe ponto decimal,
        visor.textContent += '.'; // podemos acrescentá-lo
    }
});

/* ================= PORCENTAGEM =====================*/

let btnPorcentagem = document.querySelector('#porcentagem');

btnPorcentagem.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }
    
    let valorAtual = Number(visor.textContent);
    let resultado = valorAtual / 100;

    visor.textContent = String(resultado);

    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }    
});

/* ================= ELEVADO AO QUADRADA =====================*/
let btnX2 = document.querySelector('#x2');

btnX2.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }

    let valorAtual = Number(visor.textContent);
    let resultado = Math.pow(valorAtual, 2);

    visor.textContent = String(resultado);

    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }
    
});

/* ================= RAIZ QUADRADA =====================*/
let btnRaizQuadrada = document.querySelector('#raizQuadrada');

btnRaizQuadrada.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }

    let valorAtual = Number(visor.textContent);

    if(valorAtual < 0){
        visor.textContent = 'Erro';
        operadorSelecionado = null;
        iniciarNovoNumero = true;
        return;
    }

    let resultado = Math.sqrt(valorAtual);
    visor.textContent = String(resultado);

    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }
});

let btnMaisMenos = document.querySelector('#maisMenos');
btnMaisMenos.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }

    let valorAtual = Number(visor.textContent);

    valorAtual = valorAtual * (-1);
    visor.textContent = String(valorAtual);

});

/* ================= MC - MEMORY CLEAR =====================*/
let btnMC = document.querySelector('#mc');

btnMC.addEventListener('click', function(){

    memoria = 0;
});

/* ================= M+ ADICIONAR À MEMÓRIA =====================*/
let btnMMais = document.querySelector('#mMais');

btnMMais.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }

    let valorAtual = Number(visor.textContent);
    memoria = memoria + valorAtual;
    
    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }
});

/* ================= M- SUBTRAIR À MEMÓRIA =====================*/
let btnMMenos = document.querySelector('#mMenos');

btnMMenos.addEventListener('click', function(){

    if(visor.textContent === 'Erro'){
        return;
    }

    let valorAtual = Number(visor.textContent);
    memoria = memoria - valorAtual;

    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }    
});

/* ================= MR - MEMORY RECOVER =====================*/
let btnRM = document.querySelector('#mr');

btnRM.addEventListener('click', function(){

    visor.textContent = String(memoria);

    if(operadorSelecionado === null){
        iniciarNovoNumero = true;
    }else{
        iniciarNovoNumero = false;
    }
});

/* ================= BOTÃO HISTÓRICO =====================*/
let btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', function(){
    historico.textContent = 'No calculations yet'
});