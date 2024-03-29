const wheaterForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

wheaterForm.addEventListener('submit',(e) => {
	e.preventDefault();
	messageOne.textContent='Caricamento......'
	messageTwo.textContent=''
	const location = search.value
	fetch('/wheater?address='+location).then((response)=> {
		response.json().then((data)=> {
			if(data.error) {
				messageOne.textContent=''
				messageTwo.textContent=data.error
			}
			else {
				messageOne.textContent=data.location
				messageTwo.textContent=data.forecast
			}
		})
	})
})