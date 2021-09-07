'use strict'

// let database = [
//   {'task': 'estudar JS', 'status': ''},
//   {'task': 'estudar atomic red team', 'status': 'checked'},
//   {'task': 'teste', 'status': ''}
// ]

const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database))

const addTodo = (task, status = '', index) => {
  // Primeiramente, o item é criado na memória e um label
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index} />
    <div>${task}</div>
    <input type="button" value="X" data-index=${index} />
    `
  document.getElementById('todoList').appendChild(item)
}

const clearTask = () => {
  //Confere os itens existentes no banco para nao ter duplicidade
  const todoList = document.getElementById('todoList')
  while(todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

const updateTasks = () => {
  clearTask()
  const database = getDatabase()
  database.forEach ((item, index)  => addTodo (item.task, item.status, index))
}

const addTask = (evento) => {
  const tecla = evento.key
  const text = evento.target.value
  console.log(tecla)
  if(tecla == 'Enter') {
    const database = getDatabase()
    database.push({'task' : text,'status': ''})
    setDatabase(database)
    updateTasks()
    evento.target.value = ''
  }
}
const removeItem = (index) => {
  const database = getDatabase()
  database.splice(index, 1)
  setDatabase(database)
  updateTasks()
}

const updateItem = (index) => {
  const database = getDatabase()
  database[index].status = database[index].status === '' ? 'checked' : ''
  setDatabase(database)
  updateTasks()
}
const clickItem = (evento) => {
  const element = evento.target
  if(element.type === 'button') {
    const index = element.dataset.index
    removeItem(index)
  } else if(element.type === 'checkbox') {
    const index = element.dataset.index
    updateItem(index)
  }
  console.log(element)

}
document.getElementById('newTask').addEventListener('keypress', addTask)
document.getElementById('todoList').addEventListener('click', clickItem)
updateTasks()
