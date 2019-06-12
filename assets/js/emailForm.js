const inputMessage = document.querySelector('#inputMessage');
const modalMessage = document.querySelector('#modalMessage');
const message = document.querySelector('#message');
inputMessage.addEventListener('click', () => {
  const m = modalMessage.value;
  message.value = m;
})

//const textarea = document.querySelector('#modalMessage');
modalMessage.addEventListener('keyup', ()=>{
  const text = modalMessage.value;
  const length = text.length; 
  charlength = document.querySelector(`div[charlength]`);
  const value = charlength.getAttribute('charlength');
  document.getElementById('counting').innerHTML= length + "/"+ value;
  if(length > value)
    alert("글자수를 초과하였습니다.");
});
