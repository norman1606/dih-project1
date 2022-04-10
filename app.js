
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
        lista.push({nome: inputItem.value, preco: 0 , checked: false});
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
        if(label.innerText !== item.nome || encontrou){
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
        checkbox.addEventListener('change', checarItem);
        checkbox.checked = item.checked;
        

        let label = document.createElement('label');
        label.htmlFor = "item-lista";
        label.id = "item-lista" + index;
        label.innerHTML = item.nome;

        riscaItem(checkbox, item, label);

        let btnExcluiItem = document.createElement('button');
        btnExcluiItem.innerHTML = 'X';
        btnExcluiItem.onclick = removeItem;

        let li = document.createElement('li');

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnExcluiItem);
        ul.appendChild(li);
        
    });
    mostrarPreco();
}

function checarItem(e) {
    
    let checkbox = e.target
    let label = checkbox.parentElement.getElementsByTagName('label')[0];
    let item = lista.find(element => element.nome == label.innerText );
    riscaItem(checkbox, item, label);

    if(checkbox.checked) {
        item.preco = pedirPreco();
    }

    salvarLista();
    mostrarPreco();

}

function riscaItem(checkbox, item, label) {
    if(checkbox.checked) {
        item.checked = true;
        label.style.textDecoration = 'line-through';
    }else{
        item.checked = false;
        label.style.textDecoration = 'none';
    }

}

function somarPreco() {
    const precoTotal = lista.reduce((acc, produto) => {
        if(produto.checked){
            return acc + produto.preco;
        }
        return acc;
    }, 0
    ) 
    return precoTotal;
} 

    function mostrarPreco() {
        let span = document.getElementById('valorProduto');
        let precoTotal = somarPreco();
        span.innerText = precoTotal;
    }


function limparLista() {
    ul.innerHTML = '';
    lista = [];
    console.log(lista);
    localStorage.clear();
    mostrarPreco();
    

}

function pedirPreco() {
    let valor = parseFloat(prompt('Digite o valor do produto:'));

    if(isNaN(valor)) {
        return 0;

    }
    return valor;
}

btnAdd.addEventListener('click', adicionar);
btnLimpar.addEventListener('click', limparLista);
