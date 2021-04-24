import '../scss/app.scss';

const todoList = document.querySelector('.todo-task__list');
const todoItems = todoList.childNodes;
const tabsList = document.querySelector('.tabs__list');
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

function todoListClickHandler(evt) {
  const task = evt.target.closest('.todo-task__item');

  if (task) {
    const taskContent = task.querySelector('.todo-task__content');

    if (evt.target.className === 'button button--important' || evt.target.className === 'button button--unimportant') {
      const buttonImportant = task.querySelector('.button');

      buttonImportant.classList.toggle('button--important');
      buttonImportant.classList.toggle('button--unimportant');
      taskContent.classList.toggle('todo-task__content--important');

      if (buttonImportant.textContent === 'Mark important') {
        buttonImportant.textContent = 'Not important';
      } else {
        buttonImportant.textContent = 'Mark important';
      }
    } else if (evt.target.className === 'button button-remove') {
      task.remove();
    } else {
      taskContent.classList.toggle('todo-task__content--completed');
    }
  }
}

formAddTask.addEventListener('submit', formAddTaskSubmitHandler);
tabsList.addEventListener('click', tabClickHandler);
todoList.addEventListener('click', todoListClickHandler);

