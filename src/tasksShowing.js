let proyectShown = 'Home';

const proyectButtons = document.querySelector('proyectBtns-container')

proyectButtons.addEventListener('click', (event) => {
    proyectShown = event.target.id;
    console.log(proyectShown)
})
