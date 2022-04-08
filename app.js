
const inputItem = document.getElementById('item');
const btnAdd = document.getElementById('botao-add');
const btnLimpar = document.getElementById('botao-limpar');
const ul = document.getElementById('lista');

let lista = [];
let listaJSON = localStorage.getItem('lista');

if(listaJSON){
    lista = JSON.parse(listaJSON);
    mostrarLista();
}

function salvarLista() {
    let listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
}

function adicionar() {
    if(inputItem.value){
        lista.push(inputItem.value);
        inputItem.value = '';
        mostrarLista();
        salvarLista();
    }else{
        alert('Insira seu item');
    }

}

function removeItem(e) {
    let label = e.target.parentElement.getElementsByTagName('label')[0];
    let novaLista = [];
    let encontrou = false;

    lista.forEach(item => {
        if(label.innerText !== item || encontrou){
            novaLista.push(item);
        }else{
            encontrou = true;
        }
    });
    lista = novaLista;
    mostrarLista();


}

function mostrarLista() {
    ul.innerHTML = '';
    lista.forEach((item, index) => {
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.id = "checkbox" + index;
        checkbox.addEventListener('change', riscaItem);

        let label = document.createElement('label');
        label.htmlFor = "item-lista";
        label.id = "item-lista" + index;
        label.innerHTML = item;

        let btnExcluiItem = document.createElement('button');
        btnExcluiItem.innerHTML = 'X';
        btnExcluiItem.onclick = removeItem;

        let li = document.createElement('li');

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnExcluiItem);
        ul.appendChild(li);
        
    });

}

function riscaItem(e) {
    let checkbox = e.target
    let label = checkbox.parentElement.getElementsByTagName('label')[0];
    if(checkbox.checked) {
        label.style.textDecoration = 'line-through';
    }else{
        label.style.textDecoration = 'none';
    }
}


function limparLista() {
    ul.innerHTML = '';
    lista = [];
    console.log(lista);
    localStorage.clear();
    

}

btnAdd.addEventListener('click', adicionar);
btnLimpar.addEventListener('click', limparLista);
