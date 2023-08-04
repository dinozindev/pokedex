// armazena na const pokemonName o <span> referente ao nome do pokemon.
const pokemonName = document.querySelector('.pokemon__name');
// armazena na const pokemonNumber o <span> referente ao número do pokemon.
const pokemonNumber = document.querySelector('.pokemon__number');
// armazena na const pokemonImage a <img> referente à imagem do pokemon. 
const pokemonImage = document.querySelector('.pokemon__image');
// armazena na const form o <form> referente à pesquisa do pokemon.
const form = document.querySelector('.form');
// armazena na const input o valor digitado no <input>;
const input = document.querySelector('.input__search');
// armazena na const btnPrev o botão .btn__prev.
const btnPrev = document.querySelector('.btn-prev');
// armazena na const btnNext o botão .btn__next.
const btnNext = document.querySelector('.btn-next');
// consts relacionadas aos botões de cada geração.
const btnGen1 = document.querySelector('.btn-1');
const btnGen2 = document.querySelector('.btn-2');
const btnGen3 = document.querySelector('.btn-3');
const btnGen4 = document.querySelector('.btn-4');
const btnGen5 = document.querySelector('.btn-5');
const btnGen6 = document.querySelector('.btn-6');
const btnGen7 = document.querySelector('.btn-7');
// define o primeiro pokémon a ser exibido quando o site é carregado, além de definir o id do pokemon atual para a funcionalidade dos botões de prev e next. 
let searchPokemon = 1;

    // FETCH DA POKEAPI
const fetchPokemon = async (pokemon) => {
    // busca na PokeAPI o determinado pokemon que foi buscado.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // caso o status da busca na API esteja ok (status 200), tudo será executado corretamente. Caso contrário, o pokemon em formato .json não é retornado, deixando a const data vazia. 
    if (APIResponse.status === 200) {
        // após a busca/promise ter sido concluída, o arquivo recebido é formatado em .json para que o JavaScript possa acessá-lo.
        const data = await APIResponse.json();
        // retorna o valor de data para que possa ser utilizada. 
        return data;
        
    }
   
}
    // RENDERIZAÇÃO DO POKEMON NA TELA
const renderPokemon = async (pokemon) => {
    // como a renderização do pokemon na tela requer as informações presentes na API, é necessário que essa function também seja assíncrona, para que possa esperar a promise da function fetchPokemon ser concluída, para então executar a renderização do pokemon. 
    // enquanto a promise de busca do pokemon é resolvida, uma mensagem de loading é exibida. 
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';
    // a const recebe como parâmetro o pokemon obtido na API através de fetchPokemon.
    const data = await fetchPokemon(pokemon);

    // caso o pokemon buscado na API existir, tudo será executado corretamente.
    if (data) {
        // define a imagem com display:block, para que, mesmo que o pokemon anteriormente buscado não exista, o próximo, se existir, será renderizado.
        pokemonImage.style.display = "block";
        // insere no HTML a propriedade "name" presente no objeto pokemon obtido na API.
        pokemonName.innerHTML = data.name;
        // insere no HTML a propriedade "id", referente ao número do pokemon, presente no objeto pokemon obtido na API.
        pokemonNumber.innerHTML = data.id;
        // após o pokemon ter sido renderizado, o valor do input é zerado, ou seja, o que foi pesquisado não aparece no input mais, facilitando futuras buscas. 
        input.value = '';
        // define a variável searchPokemon com o id do pokemon pesquisado na API. 
        searchPokemon = data.id;
    } else {
        // caso o pokemon não tenha sido encontrado, não aparecerá nenhum pokemon e uma mensagem de erro será exibida. 
        
        pokemonImage.src = './img/MissingNo.png'
        pokemonName.innerHTML = 'Pokemon not found.';
        pokemonNumber.innerHTML = '';
    }

    if (data.id < 650) {
        // insere na src da <img> o gif referente ao pokemon correspondente, acessando as propriedades do pokemon na API.
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    } else {
        // quando o id for superior a 650, utilizar como base os sprites da generation-vi.
        pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_default']
    }
    // se o id for superior a 721, utilizar como base os sprites da generation v-ii.
    if (data.id > 721) {
        pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
    }

}


// FORMULÁRIO DE PESQUISA
form.addEventListener('submit', (event) => {
    // quando o formulário for enviado (quando a pesquisa for feita), uma arrow function será executada. 
    // quando o evento for recebido, previnir que a ação padrão de um formulário seja executada.
    event.preventDefault();

    // chama a function renderPokemon usando como parâmetro o valor digitado no input, para que o pokemon seja renderizado (usa-se .toLowerCase() pois na API todos os pokemons são registrados com letra minúscula. Ou seja, ao pesquisar um pokemon com letra maiúscula, podem ocorrer erros na busca da API, portanto, o valor inserido na busca é transformado em letras minúsculas). 
    renderPokemon(input.value.toLowerCase());


})

// BOTÃO DE PREV
btnPrev.addEventListener("click", () => {
    // quando o botão de prev for pressionado, uma arrow function será executada, em que, se o id do pokemon for maior que 1, será adicionado removido 1 do valor de searchPokemon, fazendo com que o pokemon anterior seja renderizado. 
    // caso o valor de searchPokemon seja maior que 1 (primeiro pokemon), o curso normal do código seguirá. 
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }   // caso o valor de searchPokemon seja 1, o valor é definido para 808, para que possa voltar para o pokemon 807.
    if (searchPokemon = 1) {
        searchPokemon = 808;
    }
})

// BOTÃO DE NEXT
btnNext.addEventListener("click", () => {
    // quando o botão de next for pressionado, uma arrow function será executada, em que será adicionado 1 ao valor de searchPokemon, fazendo com que o pokemon seguinte seja renderizado.  
    // caso o valor de searchPokemon seja menor que 807 (último pokemon), o curso normal do código seguirá.  
    if (searchPokemon < 807) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }   // caso o valor de searchPokemon seja 807, o valor é definido para zero, para que possa voltar para o pokemon 1.
    if (searchPokemon = 807) {
        searchPokemon = 0;
    }
})

// BOTÕES GERAÇÕES
btnGen1.addEventListener("click", () => {
    searchPokemon = 1;
    renderPokemon(searchPokemon);
})

btnGen2.addEventListener("click", () => {
    searchPokemon = 152;
    renderPokemon(searchPokemon);
})

btnGen3.addEventListener("click", () => {
    searchPokemon = 252;
    renderPokemon(searchPokemon);
})

btnGen4.addEventListener("click", () => {
    searchPokemon = 387;
    renderPokemon(searchPokemon);
})

btnGen5.addEventListener("click", () => {
    searchPokemon = 494;
    renderPokemon(searchPokemon);
})

btnGen6.addEventListener("click", () => {
    searchPokemon = 650;
    renderPokemon(searchPokemon);
})

btnGen7.addEventListener("click", () => {
    searchPokemon = 722;
    renderPokemon(searchPokemon);
})

// quando a página é carregada, chama a function renderPokemon utilizando como parâmetro a variável searchPokemon, que representa o Bulbasaur. 
renderPokemon(searchPokemon);



