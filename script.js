var inputEl = document.querySelector('input')
var buttonEl = document.querySelector('button')
var ulEl = document.querySelector('ul')

buttonEl.addEventListener('click', addTodo)

function addTodo() {
	var userInput = inputEl.value
  if (userInput.trim() == '') {
  	return;
  }
	var todoLi = document.createElement('LI')
  todoLi.textContent = userInput
  ulEl.appendChild(todoLi)
}