const inputMessage = document.querySelector('#inputMessage');
const modalMessage = document.querySelector('#modalMessage');
const message = document.querySelector('#message');
inputMessage.addEventListener('click', () => {
  const m = modalMessage.value;
  message.value = m;
});

document.addEventListener('DOMContentLoaded', function(){
  modalTrigger();
  window.addEventListener('resize', ()=>{
    modalTrigger();
  });
});

//const textarea = document.querySelector('#modalMessage');
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

function modalTrigger(){
  const windowSize = document.body.clientWidth;
  if(windowSize > 600){
    message.classList.remove("modal-trigger");
    console.log(windowSize);
  }
  else{
    message.classList.add("modal-trigger");
  }
}
