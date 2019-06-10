const inputMessage = document.querySelector('#inputMessage');
const modalMessage = document.querySelector('#modalMessage');
const message = document.querySelector('#message');
inputMessage.addEventListener('click', () => {
  const m = modalMessage.value;
  message.value = m;
  console.log(m.length);
})
