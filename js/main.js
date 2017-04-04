var lista = [
    {"nome":"Eduardo","email":"eduardo@eduardo.com","telefone":"34 999 999 999"},
    {"nome":"José","email":"jose@jose.com","telefone":"34 888 888 888"},
    {"nome":"Diego","email":"diego@diego.com","telefone":"34 777 777 777"},
    {"nome":"Maria","email":"maria@maria.com","telefone":"34 666 666 666"},
    {"nome":"Joana","email":"joana@joana.com","telefone":"34 555 555 555"}
]; //Dados padrões, pode ser deixada vazia, dados inseridos apenas como exemplo

//Variaveis
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var telefone = document.getElementById('telefone');
var menuPadrao = document.getElementById('btnAdd');
var menuAtualizarDados = document.getElementById('btnUpdate');
var idUpdate = document.getElementById('inputIDUpdate');
var update = document.getElementById('idUpdate');

//Insere a tabela dinamicamente
function setLista(lista){
    var tabela = "<thead><tr><td><b>Nome</b></td><td><b>Email</b></td><td><b>Telefone</b></td><td><b>Ação</b></td></tr></thead><tbody>";
    var numeroContatos = 0;
    for(var percorre in lista){
      tabela += "<tr><td>" + lista[percorre].nome + "</td><td>" + lista[percorre].email + "</td><td>" + lista[percorre].telefone + "</td><td><button class='btn btn-default' onclick='atualizarDados("+ percorre +");'>Editar</button><button class='btn btn-default' onclick='deletarLinha("+ percorre +")'>Deletar</button></td></tr>";
      numeroContatos++;  
    }
    tabela += "</tbody>";
    
    var listaTabela = document.getElementById('listaTabela');
    listaTabela.innerHTML = tabela;
    var numeroContatosHTML = document.getElementById('numeroDeContatos');
    numeroContatosHTML.innerHTML = numeroContatos;
    saveListStorage(lista);
};    
//Adiciona um item a lista 
function addDados(){
    var nomeAdd = nome.value;
    var emailAdd = email.value;
    var telefoneAdd = telefone.value;
    
    lista.unshift({
       "nome" : nomeAdd, "email" : emailAdd, "telefone" : telefoneAdd 
    });
    setLista(lista); 
    limpaFormulario();
}

//Reseta os valores do Formulario
function limpaFormulario(){
    nome.value = '';
    email.value = '';
    telefone.value = '';
    document.getElementById('idUpdate').innerHTML = "";
    
    menuAtualizarDados.style="display: none";
    menuPadrao.style="display:inline-block";
};

//Atualiza os dados do contato selecionado
function atualizarDados(posicao){
    nome.value = lista[posicao].nome;
    email.value = lista[posicao].email;
    telefone.value = lista[posicao].telefone;
    
    menuPadrao.style="display: none";
    menuAtualizarDados.style="display: inline-block";
    idUpdate.innerHTML = "<input id='idUpdate' type='text' value= "+posicao+" >";
}

//Salva os dados de um novo contato
function salvarDados(){
    var local = document.getElementById('idUpdate').value;
    lista[local] = {
        "nome":nome.value,
        "email":email.value,
        "telefone":telefone.value
    };
    limpaFormulario();
    setLista(lista); 
}

//Deleta o usuario da respectiva linha
function deletarLinha(id){
	if(confirm("Gostaria de deletar o elemento?")){
		if(id === (lista.length - 1)){
			lista.pop();
		}else if(id === 0){
			lista.shift();
		}else{
			var auxIni = lista.slice(0, id);
			var auxFin = lista.slice(id+1);
			lista = auxIni.concat(auxFin);
		}
	}
	setLista(lista);
}

//As duas próximas funções são usadas para salvar os dados no Storage do navegador
function saveListStorage(lista){
	var jsonStr = JSON.stringify(lista);
	localStorage.setItem("lista", jsonStr);
}

function initStorage(){
	var testList = localStorage.getItem("lista");
	if(testList){
		lista = JSON.parse(testList);
	}
	setLista(lista);
}

initStorage();

