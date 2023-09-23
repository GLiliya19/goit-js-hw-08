import throttle from 'lodash.throttle';

function saveFormDataToLocalStorage() {
  const form = document.querySelector('.feedback-form');
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function populateFormFromLocalStorage() {
  const form = document.querySelector('.feedback-form');
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedData) {
    form.email.value = savedData.email || '';
    form.message.value = savedData.message || '';
  }
}

populateFormFromLocalStorage();

window.addEventListener('load', populateFormFromLocalStorage);

const throttledSaveData = throttle(saveFormDataToLocalStorage, 500);

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttledSaveData);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  form.email.value = '';
  form.message.value = '';

  console.log({
    email: form.email.value,
    message: form.message.value,
  });
});
