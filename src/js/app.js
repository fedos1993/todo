import '../scss/app.scss';

/* Your JS Code goes here */
const todoList = document.querySelector('.todo-task__list');
const todoItems = todoList.childNodes;
const formAddTask = document.forms.addTask;
const addTaskField = formAddTask.querySelector('.add-task__textarea');

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  if (text) {
    element.textContent = text;
  }
  return element;
}

function createTodoItem(text) {
  const item = makeElement('li', 'todo-task__item');
  const itemContent = makeElement('p', 'todo-task__content', text);
  const itemButtons = makeElement('div', 'todo-task__buttons');
  const itemButtonImportant = makeElement('button', 'button button--important', 'Mark important');
  const itemButtonRemove = makeElement('button', 'button button-remove');

  item.setAttribute('tabindex', 0);

  item.appendChild(itemContent);
  item.appendChild(itemButtons);
  itemButtons.appendChild(itemButtonImportant);
  itemButtons.appendChild(itemButtonRemove);

  return item;
}


function formAddTaskSubmitHandler(evt) {
  evt.preventDefault();

  if (addTaskField.value.trim() !== '') {
    const item = createTodoItem(addTaskField.value);
    todoList.appendChild(item);
  }

  addTaskField.value = '';
  localStorage.removeItem('area');
  updateTodoItems();
}

formAddTask.addEventListener('submit', formAddTaskSubmitHandler);
