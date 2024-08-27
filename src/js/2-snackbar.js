import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');


function onFormSubmit(event) {
  event.preventDefault();

  const radioButtonState = form.state.value;
  const delay = parseInt(input.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioButtonState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}

form.addEventListener('submit', onFormSubmit);
