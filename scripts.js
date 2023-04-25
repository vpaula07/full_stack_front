/*
  --------------------------------------------------------------------------------------
  Função para adequar o front-end de acordo com os parâmetros
  --------------------------------------------------------------------------------------
*/
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

/*
  ----------------------------------------------
  Função para Pasquisar usuários
  ---------------------------------------------
*/
let campoPesquisa = document.getElementById("newSearch");
campoPesquisa.addEventListener("keyup", pesquisarUsuarios);

function pesquisarUsuarios() {
  let termoPesquisa = campoPesquisa.value.toLowerCase();
  let tabelaUsuarios = document.getElementById("myTable");
  let linhasUsuarios = tabelaUsuarios.getElementsByTagName("tr");

  for (let i = 1; i < linhasUsuarios.length; i++) {
    let nomeUsuario = linhasUsuarios[i].getElementsByTagName("td")[0];
    if (nomeUsuario.innerHTML.toLowerCase().indexOf(termoPesquisa) > -1) {
      linhasUsuarios[i].style.display = "";
    } else {
      linhasUsuarios[i].style.display = "none";
    }
  }
}
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/cadastros';
      fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.cadastros.forEach(item => insertList(item.usuario, item.cpf, item.email, item.senha))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

   /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()

 
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um usuario na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputUser, inputRegister, inputEmail, inputPassword) => {
    const formData = new FormData();
    formData.append('usuario', inputUser);
    formData.append('cpf', inputRegister);
    formData.append('email', inputEmail);
    formData.append('senha', inputPassword);
    
         
  
    let url = 'http://127.0.0.1:5000/cadastro';
      fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
    
  }

  
      
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada usuario da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um usuario da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const usuarioItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(usuarioItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um usuario da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/cadastro?usuario=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com usuario, cpf, e-mail e senha
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputUser = document.getElementById("newInput").value;
    let inputRegister = document.getElementById("newRegister").value;
    let inputEmail = document.getElementById("newEmail").value;
    let inputPassword = document.getElementById("newPassword").value;
    
        
    if (inputUser === '') {
      alert("Escreva o usuario solicitado!");
    } else if (isNaN(inputRegister)) {
      alert("CPF precisa ser números!");
    }
    else {
      insertList(inputUser, inputRegister, inputEmail, inputPassword)
      postItem(inputUser, inputRegister, inputEmail, inputPassword)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir usuarios na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nameUser, register, email, password) => {
    var item = [nameUser, register, email, password]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newInput").value = "";
    document.getElementById("newRegister").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newPassword").value = "";
   
       
  
    removeElement()
  }

 

  