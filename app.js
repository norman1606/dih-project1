
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
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.id = "checkbox";

        let label = document.createElement('label');
        label.htmlFor = "item-lista"
        label.innerHTML = item;

        let li = document.createElement('li');

        //let btnExcluiItem = document.createElement('button');
        //btnExcluiItem.innerHTML = 'X'

       // li.appendChild(btnExcluiItem);
        li.appendChild(checkbox);
        li.appendChild(label);
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
