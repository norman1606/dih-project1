
const inputItem = document.getElementById('item');
const btnAdd = document.getElementById('botao-add');
const btnLimpar = document.getElementById('botao-limpar');
const ul = document.getElementById('lista');

let lista = [];

function adicionar() {
    if(inputItem.value){
        lista.push(inputItem.value);
        inputItem.value = '';
        mostrarLista();
    }else{
        alert('Insira seu item');
    }

}

function mostrarLista() {
    ul.innerHTML = '';
    lista.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item;
        ul.appendChild(li);
        
    });
}

function limparLista() {
    ul.innerHTML = '';
    lista = [];
    console.log(lista);
    

}

btnAdd.addEventListener('click', adicionar);
btnLimpar.addEventListener('click', limparLista);
