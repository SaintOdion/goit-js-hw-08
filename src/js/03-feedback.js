import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

populateInputs();

function getFormData() {
  return {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
}

function onInput() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getFormData()));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(getFormData());
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateInputs() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    form.elements.email.value = savedData.email;
    form.elements.message.value = savedData.message;
  }
}
