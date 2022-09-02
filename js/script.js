const pokemonName = document.querySelector('.pokemon__name'); //variável global
const pokemonNumber = document.querySelector('.pokemon__number'); 
const pokemonImage = document.querySelector('.pokemon__image'); 

const form = document.querySelector('.form'); 
const input = document.querySelector('.input__search'); 
const buttonPrev = document.querySelector('.btn-prev'); 
const buttonNext = document.querySelector('.btn-next'); 

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //usando as crases, fica template literal. OUtra coisa, o fetch é assíncrono. Faz o fetch mas não sabe qto tempo a url vai levar pra retornar os dados. Usa então o await, qdo o código chegar, ele vai esperar o fetch concluir. Porém só pode usar o await em funções assíncronas. Para fazer isso, coloca async na função fetchPokemon. 

    //e se digitar um pokemon que não existe?
    if (APIResponse.status === 200) { //200 é qdo dá tudo certo com o json
        //precisamos extrair os dados em JSON
        const data = await APIResponse.json() 
        return data;
    }
}

    //fetchPokemon('25'); //código do pikachu

const renderPokemon = async (pokemon) => {//função que renderiza os dados na tela

    pokemonName.innerHTML = 'Loading...'; //como demora essa parte, coloca loading só pra pessoa saber que está carregando
        
    const data = await fetchPokemon(pokemon); //lembrando que fetchPokemon é uma função assíncrona, então ela retorna uma promise. Então a gente precisa esperar ela executar - AWAIT 

    if (data) {
        pokemonImage.style.display = 'block'; //mostra a img. Se ela tiver sido escondida antes, não iria aparecer sem esse block 
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = ''; //depois que efetuar a pesquisa, vai limpar a barra de busca
        searchPokemon = data.id; //pra qdo clicar em next ou prev, ele partir do número atual
    } else {
        pokemonImage.style.display = 'none'; //esconde a imagem caso não encontre pokemon
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
     }
}
//renderPokemon('pikachu'); //renderiza o pokemon 25 (pode ser o nome tb), então busca os dados do pikachu e renderiza o nome 

form.addEventListener('submit', (event) => { //depois do submit tem uma função. Poderia ter colocado separado como const funcao = () => {}, aí como é uma funcao simples, passou a arrow function direto
    event.preventDefault(); //como é um form, ele tem comportamento padrão, entaõ para bloquear
        //console.log(input.value)
    renderPokemon(input.value.toLowerCase()); //pra não ter problema na busca do jeito que for digitado, mas vamos passar isso lá na função de busca
});

buttonPrev.addEventListener('click', () => { 
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => { 
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//renderPokemon('1'); =
renderPokemon(searchPokemon);