const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const text = prompt('Enter new TODO');

  if (!text) {
    return;
  }

  const lastItem = list.lastElementChild;
  const id = lastItem ? Number(lastItem.id.slice(4)) + 1 : 0;

  const li = createTodoItem(id);
  const checkbox = createCheckbox(id);
  const todoText = createTodoText(id, text);
  const deleteBtn = createDeleteBtn(id);

  renderElements(li, checkbox, todoText, deleteBtn);

  incrementCount();
  incrementUncheckedCount();
}

function createTodoItem(id) {
  const li = document.createElement('li');

  li.id = 'item' + id;
  li.classList.add(classNames.TODO_ITEM);

  return li;
}

function createCheckbox(id) {
  const checkbox = document.createElement('input');

  checkbox.id = 'checkbox' + id;
  checkbox.classList.add(classNames.TODO_CHECKBOX);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('change', handleCheckboxChange);

  return checkbox;
}

function createTodoText(id, text) {
  const todoText = document.createElement('span');
  const textNode = document.createTextNode(text);

  todoText.id = 'todo-text' + id;
  todoText.classList.add(classNames.TODO_TEXT);
  todoText.appendChild(textNode);

  return todoText;
}

function createDeleteBtn(id) {
  const deleteBtn = document.createElement('button');

  deleteBtn.id = 'delete-btn' + id;
  deleteBtn.innerHTML = 'X';
  deleteBtn.classList.add(classNames.TODO_DELETE);
  deleteBtn.addEventListener('click', handleDelete.bind(null, id));

  return deleteBtn;
}

function handleCheckboxChange(event) {
  const span = document.getElementById('todo-text' + id);

  if (event.target.checked) {
    span.style.textDecoration = 'line-through';
    decrementUncheckedCount();
  } else {
    span.style.textDecoration = 'none';
    incrementUncheckedCount();
  }
}

function handleDelete(id) {
  decrementCount();

  const check = document.getElementById('checkbox' + id);

  if (!check.checked) {
    decrementUncheckedCount();
  }

  const item = document.getElementById('item' + id);

  list.removeChild(item);
}

function renderElements(li, checkbox, todoText, deleteBtn) {
  li.appendChild(checkbox);
  li.appendChild(todoText);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function incrementCount() {
  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1;
}

function decrementCount() {
  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1;
}

function incrementUncheckedCount() {
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;
}

function decrementUncheckedCount() {
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1;
}
