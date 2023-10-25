import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';

const elemForm = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
const formData = {
  email: '',
  message: '',
};
populateTextarea();
elemForm .form.addEventListener('input', throttle(onTextareaInput, 500));
elemForm .form.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem(KEY);
  evt.currentTarget.reset();
  console.log(elemForm);
  
});

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(KEY, stringifiedData);
}
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(KEY));
  if (savedMessage === null) {
    return;
  }

  elemForm .textarea.value = savedMessage.message || '';
  elemForm .input.value = savedMessage.email || '';
  formData.email = savedMessage.email || '';
  formData.message = savedMessage.message || '';
}

