const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCPF = document.querySelector('#m-CPF')
const sDatadeNascimento = document.querySelector('#m-Data de nascimento')
const sEndereco = document.querySelector('#m-Endereco')
const sTelefone = document.querySelector('#m-Telefone')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const sBancodehoras = document.querySelector('#m-BancodeHoras')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCPF.value = itens[index].CPF
    sDatadeNascimento.value = itens[index].DatadeNascimento
    sEndereco.value = itens[index].Endereco
    sTelefone.value = itens[index].Telefone
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    sBancodehoras.value = itens[index].BancodeHoras
    id = index
  } else {
    sNome.value = ''
    sCPF.value = ''
    sDatadeNascimento.value = ''
    sEndereco.value = ''
    sTelefone.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    sBancodehoras.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.CPF}</td>
    <td>${item.DatadeNascimento}</td>
    <td>${item.Endereco}</td>
    <td>${item.Telefone}</td>
    <td>${item.funcao}</td>
    <td>R$${item.salario}</td>
    <td>${item.BancodeHoras}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCPF.value == '' || sDatadeNascimento.value == '' || sEndereco.value == '' || 
       sTelefone.value == '' || sFuncao.value == '' || sSalario.value == '' || sBancodehoras.value ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].CPF = sCPF.value
    itens[id].DatadeNascimento = sDatadeNascimento.value
    itens[id].Endereco = sEndereco.value
    itens[id].Telefone = sTelefone.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    itens[id].BancodeHoras = sBancodehoras.value

  } else {
    itens.push({'nome': sNome.value, 'CPF': sCPF.value, 'DatadeNascimento': sDatadeNascimento.value, 'Endereco': sEndereco.value,
    'Telefone': sTelefone.value, 'funcao': sFuncao.value, 'salario': sSalario.value, 'BancodeHoras': sBancodehoras.value,})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()