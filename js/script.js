'use strict';
let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
    prepareDomElements();
    prepareDomEvents();
}

const prepareDomElements = () => {
    todoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDomEvents = () => {
    addBtn.addEventListener('click', addNewTodo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoTex);
    todoInput.addEventListener('keyup', enterKeyAddTodos);
}

const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li');
        newTodo.textContent = todoInput.value;
        ulList.append(newTodo);

        createTools();

        todoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Podaj tresc zadania';
    }
}

const createTools = () => {
    const tools = document.createElement('div');
    tools.classList.add('tools');

    newTodo.append(tools);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent = 'EDIT';

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('delete');
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';

    tools.append(completeBtn, editBtn, removeBtn);

}

const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')) {
        showPopup(e);
    } else if (e.target.matches('.delete')) {
        deleteTodo(e);
    }
}

const showPopup = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';

}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const changeTodoTex = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
        popupInfo.textContent = '';

    } else {
        popupInfo.textContent = 'mususz podac jakas trasc';
    }
}

const deleteTodo = (e) => {
    e.target.closest('li').remove()
    const allTodos = document.querySelectorAll('li');
    if (allTodos.length === 0) {
        errorInfo.textContent = 'brak zadan na liscie';
    }
}

const enterKeyAddTodos = (e) => {
    if (e.key === 'Enter') {
        addNewTodo();
    }
}

document.addEventListener('DOMContentLoaded', main);