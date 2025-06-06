import '../scss/app.scss';

const todoList = document.querySelector('.todo-task__list');
const todoItems = todoList.childNodes;
const tabsList = document.querySelector('.tabs__list');
const formAddTask = document.forms.addTask;
const addTaskField = formAddTask.querySelector('.add-task__textarea');
const searchInput = document.querySelector('#search');

window.onload = () => {
  if (localStorage.getItem('area')) {
    addTaskField.value = localStorage.getItem('area');
  }

  todoList.innerHTML = localStorage.getItem('todoItems');
};

function updateTodoItems() {
  localStorage.setItem('todoItems', todoList.innerHTML);
}

function windowUnloadHandler() {
  localStorage.setItem('area', addTaskField.value);
}

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
  const itemButtonImportant = makeElement('button', 'button button--important');
  const textButtonImportant = makeElement('span', 'button__content', 'Mark important');
  const itemButtonRemove = makeElement('button', 'button button-remove');

  item.setAttribute('tabindex', 0);

  item.appendChild(itemContent);
  item.appendChild(itemButtons);
  itemButtonImportant.appendChild(textButtonImportant);
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

function tabClickHandler(evt) {
  const { target } = evt;
  const tabCurrent = tabsList.querySelector('.tabs__link--current');

  if (target.tagName === 'A') {
    evt.preventDefault();
    tabCurrent.classList.remove('tabs__link--current');
    target.classList.add('tabs__link--current');
  }

  todoItems.forEach((item) => {
    item.classList.remove('hidden');
  });

  if (target.id === 'tab-done') {
    todoItems.forEach((item) => {
      if (!item.querySelector('.todo-task__content--completed')) {
        item.classList.add('hidden');
      }
    });
  } else if (target.id === 'tab-active') {
    todoItems.forEach((item) => {
      if (item.querySelector('.todo-task__content--completed')) {
        item.classList.add('hidden');
      }
    });
  }
}

function searchInputHandler() {
  const valueSearch = searchInput.value.toLowerCase();

  todoItems.forEach((item) => {
    const valueItem = item.querySelector('.todo-task__content').textContent.toLowerCase();

    if (valueItem.indexOf(valueSearch) === -1) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  });
}

function todoListClickHandler(evt) {
  const task = evt.target.closest('.todo-task__item');

  if (task) {
    const taskContent = task.querySelector('.todo-task__content');

    if (evt.target.closest('.button--important') || evt.target.closest('.button--unimportant')) {
      const buttonImportant = task.querySelector('.button');
      const buttonContent = buttonImportant.firstChild;

      buttonImportant.classList.toggle('button--important');
      buttonImportant.classList.toggle('button--unimportant');
      taskContent.classList.toggle('todo-task__content--important');

      if (buttonContent.textContent === 'Mark important') {
        buttonContent.textContent = 'Not important';
      } else {
        buttonContent.textContent = 'Mark important';
      }
    } else if (evt.target.className === 'button button-remove') {
      task.remove();
    } else {
      taskContent.classList.toggle('todo-task__content--completed');
    }

    updateTodoItems();
  }
}

window.addEventListener('unload', windowUnloadHandler);
formAddTask.addEventListener('submit', formAddTaskSubmitHandler);
tabsList.addEventListener('click', tabClickHandler);
searchInput.addEventListener('input', searchInputHandler);
todoList.addEventListener('click', todoListClickHandler);
