const inputMessage = document.querySelector('#inputMessage');
const modalMessage = document.querySelector('#modalMessage');
const message = document.querySelector('#message');

inputMessage.addEventListener('click', () => {
  const m = modalMessage.value;
  message.value = m;
});


//const textarea = document.querySelector('#modalMessage');
const text = modalMessage.value;
const length = text.length;
charlength = document.querySelector(`div[charlength]`);
const value = charlength.getAttribute('charlength');
document.getElementById('counting').innerHTML= length + "/"+ value;
modalMessage.addEventListener('keyup', ()=>{
  const text = modalMessage.value;
  const length = text.length;
  charlength = document.querySelector(`div[charlength]`);
  const value = charlength.getAttribute('charlength');
  document.getElementById('counting').innerHTML= length + "/"+ value;
  change = document.getElementById('counting');
  if(length > value){
    alert("입력범위 초과");
  }
});
