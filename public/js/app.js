



const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('#error')
const msg = document.querySelector('#message')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	let location = input.value
	msg.textContent = 'Loading...'
	errorMsg.textContent = ''

	fetch('http://localhost:3000/weather?address='+location).then((res) => {
		res.json().then( (data) => {
			
			if(data.error){
				errorMsg.textContent = data.error
				msg.textContent = ''
			}else{
				msg.textContent = 'Temperature : '+data.temperature
			}
		})
	})	
})