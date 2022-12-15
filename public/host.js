const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
document.body.style.backgroundColor = "white";


var cleaned = false;

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')

    if (cleaned === true){
	// Play the sound if someone presses the buzzer. TODO: warn host of possible insufficient permissions
        document.body.style.backgroundColor = "red"
        var audio = new Audio("buzzer.ogg")
        audio.play()
    }
    // If the event listener was run before this function, reset it to false again. Otherwise, nothing changes.
    cleaned = false
})

clear.addEventListener('click', () => {
  document.body.style.backgroundColor = "white"
  cleaned = true
  socket.emit('clear')
  buzzList.innerHTML = ''
})
