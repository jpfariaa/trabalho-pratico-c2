// promise pra chamar os dados de uma API contendo
// todas as cores suportadas pelo HTML5
async function getColors() {
    const response = await fetch('https://api.color.pizza/v1/');
    const colors = await response.json();
    return colors;
}

const arr = [];
const escolhidos = [];
getColors().then(colors => {
    // capturando aleatoriamente cores dentro da API de cores
    let arrAux = Object.values(colors);
    for (let i = 0; i < arrAux[0].length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr.push({ nome: colors.colors[i].name, hexadecimal: colors.colors[i].hex });
    }

    // limitando a escolha de cores para apenas 10
    // e criando os elementos visuais
    for (let i = 0; i < 10; i++) {
        escolhidos.push(arr[i]);

        const a = document.createElement('a');
        a.id = arr[i].hexadecimal;
        a.style.backgroundColor = arr[i].hexadecimal;
        a.style.width = '100px';
        a.style.height = '100px';
        a.style.display = 'inline-block';
        a.style.margin = '5px';
        a.style.border = '1px solid black';
        a.style.fontWeight = 'bold';
        a.style.textAlign = 'center';
        a.style.lineHeight = '100px';
        a.style.verticalAlign = 'middle';
        a.display = 'flex';
        a.flexDirection = 'column';
        a.justifyContent = 'center';
        a.alignItems = 'center';
        a.style.cursor = 'pointer';
        a.style.textDecoration = 'none';
        document.getElementById('amostra').appendChild(a);

        const div = document.createElement('div');
        div.id = arr[i].hexadecimal + "-nome";
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.width = '100%';
        div.style.height = '100%';
        a.appendChild(div);

        const span = document.createElement('span');
        span.className = 'span-nome-cor';
        span.style.backgroundColor = arr[i].hexadecimal;
        span.innerHTML = arr[i].nome;
        div.appendChild(span);

    }

    // Ordena o array de forma aleatória e pega o primeiro elemento
    for (let i = 0; i < escolhidos.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [escolhidos[i], escolhidos[j]] = [escolhidos[j], escolhidos[i]];
    }
    localStorage.setItem('corEscolhidaPelaMaquina', escolhidos.values().next().value.nome);
    console.log(localStorage.getItem('corEscolhidaPelaMaquina'));

    // Ação de clique que vai validar a cor escolhida pelo usuário
    document.querySelectorAll('.span-nome-cor').forEach(function (element) {
        element.addEventListener('click', function () {
            // escolha do usuário
            if (element.textContent === localStorage.getItem('corEscolhidaPelaMaquina')) {
                alert('Parabéns, você acertou!');
                document.getElementById('body').style.backgroundColor = element.style.backgroundColor;
            } else {
                let tamanho = element.textContent > localStorage.getItem('corEscolhidaPelaMaquina') ? 'maior' : 'menor';
                alert(
                    'Você errou!\n' +
                    `Dica: Sua cor é alfabéticamente ${tamanho} que a minha!\n` +
                    'Tente novamente!'
                );
            }
        });
    });

}).catch(err => {
    console.log(`Erro: ${err}`);
});