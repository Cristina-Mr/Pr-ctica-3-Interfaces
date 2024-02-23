/** Funciones para mostrar las imagenes segun nivel y que salgan barajadas **/
const cardsArray = [
    {'name': 'sally', 'img': '/img/sally.jpg'},
    {'name': 'jack', 'img': '/img/jack.jpg'},
    {'name': 'zero', 'img': '/img/zero.jpg'},
    {'name': 'oogie', 'img': '/img/oogie.jpg'},
    {'name': 'alcalde', 'img': '/img/alcalde.jpg'},
    {'name': 'pato', 'img': '/img/pato.jpg'},
    {'name': 'payaso', 'img': '/img/payaso.jpg'},
    {'name': 'barrel', 'img': '/img/barrel.jpg'},
    {'name': 'lock', 'img': '/img/lock.jpg'},
    {'name': 'shock', 'img': '/img/shock.jpg'},
    {'name': 'calabaza', 'img': '/img/calabaza.jpg'},
    {'name': 'alcalde2', 'img': '/img/alcalde2.jpg'},
    {'name': 'Finkelsteinn', 'img': '/img/Finkelsteinn.png'},
    {'name': 'vampiro', 'img': '/img/vampiro1.jpg'},
    {'name': 'harlequin', 'img': '/img/harlequin-crop.jpg'},
];

const cardsReversearray = [
    {'name': 'reverso', 'img': '/img/reverso.jpg'},
];

let firstCard = null;
let secondCard = null;
let matches = 0;
const totalMatches = cardsArray.length / 2;

function mostrarParejas(numero) {
    const game = document.querySelector('.game');
    game.innerHTML = '';

    const selectedCards = cardsArray.slice(0, numero);
    const duplicatedCards = [...selectedCards, ...selectedCards];
    duplicatedCards.sort(() => Math.random() - 0.5);

    duplicatedCards.forEach((card, index) => {
        const cardElement = document.createElement('img');
        cardElement.src = cardsReversearray[0].img; // Establece la imagen reverso como predeterminada
        cardElement.alt = 'reverso';
        cardElement.dataset.name = card.name; // Almacena el nombre de la carta en el atributo de datos
        cardElement.classList.add('clickable');
        game.appendChild(cardElement);

        // Agrega el evento clic a cada carta
        cardElement.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (!firstCard) {
        firstCard = this;
        rotateCard(firstCard);
        this.src = cardsArray.find(card => card.name === this.dataset.name).img;
    } else if (!secondCard && this !== firstCard) {
        secondCard = this;
        rotateCard(secondCard);
        this.src = cardsArray.find(card => card.name === this.dataset.name).img;

        // Comprueba si las cartas coinciden
        if (firstCard.dataset.name === secondCard.dataset.name) {
            // Si coinciden, las cartas se quedan boca arriba
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            matches++;
            console.log('Matches:', matches, 'Total:', totalMatches); // Agregamos este console.log
            if (matches === totalMatches) {
                setTimeout(() => {
                    mostrarMensajeVictoria();
                }, 1000); // Espera un segundo antes de mostrar el mensaje de victoria
            }
            resetCards();
        } else {
            // Si no coinciden, las cartas se voltean nuevamente después de un breve retraso
            setTimeout(() => {
                rotateCard(firstCard);
                rotateCard(secondCard);
                setTimeout(() => {
                    firstCard.src = cardsReversearray[0].img;
                    secondCard.src = cardsReversearray[0].img;
                    resetCards();
                }, 500); // Espera medio segundo antes de revertir la imagen
            }, 1000); // Espera un segundo antes de voltear la carta
        }
    }
}

function rotateCard(card) {
    card.style.transition = "transform 0.8s ease";
    card.style.transform = "rotateY(180deg)";
    var flipSound = document.getElementById("flipSound");
    flipSound.play();
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    var flipSound = document.getElementById("flipSound");
    flipSound.play();
}

function mostrarMensajeVictoria() {
    const container = document.querySelector('.container');
    const message = document.createElement('div');
    message.classList.add('victory-message');
    message.textContent = '¡Felicidades, has ganado!';
    container.appendChild(message);
}

/** Promesas para comenzar audio al hacer clic en Play **/

function reproducirAudio() {
    return new Promise((resolve, reject) => {
        const audio = document.getElementById('audioPlayer');

        // Verifica si el audio está cargado
        if (audio.readyState >= 2) {
            // Si el audio está cargado, simplemente lo reproducimos
            audio.play();
            resolve(true); // Indica que la reproducción fue iniciada por la promesa
        } else {
            // Si el audio aún no está cargado, esperamos a que se cargue y luego lo reproducimos
            audio.oncanplaythrough = () => {
                audio.play();
                resolve(true); // Indica que la reproducción fue iniciada por la promesa
            };

            // Manejar errores de carga del audio
            audio.onerror = () => {
                reject(new Error('Error al cargar el audio'));
            };
        }
    });
}

function pausarAudio() {
    const audio = document.getElementById('audioPlayer');
    if (!audio.paused) {
        audio.pause();
        return true; // Indica que la pausa fue realizada con éxito
    }
    return false; // Indica que el audio ya estaba pausado
}

/**********  Mostrar instrucciones ****************/
function toggleInstrucciones() {
    const instruccionesContainer = document.getElementById('instruccionesContainer');
    if (instruccionesContainer.style.display === 'none') {
        instruccionesContainer.style.display = 'block';
    } else {
        instruccionesContainer.style.display = 'none';
    }
}

/** función para mostrar cartas según la dificultad seleccionada **/
function mostrarCartas() {
    const selectElement = document.getElementById('nivelSelect');
    const nivel = parseInt(selectElement.value);
    mostrarParejas(nivel);

    // Oculta el elemento 'opciones' y muestra el elemento 'container'
    const opciones = document.querySelector('.opciones');
    const container = document.querySelector('.container');
    opciones.style.display = 'none';
    container.style.display = 'block';
}

function volverAOpciones() {
    // Muestra el elemento 'opciones' y oculta el elemento 'container'
    const opciones = document.querySelector('.opciones');
    const container = document.querySelector('.container');
    opciones.style.display = 'block';
    container.style.display = 'none';
    opciones.style.position = 'static'; 
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.boton-nivel');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const nivel = parseInt(button.textContent.split(' ')[0]);
            mostrarParejas(nivel);
        });
    });

    const goButton = document.querySelector('.boton-comenzar');
    goButton.addEventListener('click', function () {
        pausarAudio();
    });
});
