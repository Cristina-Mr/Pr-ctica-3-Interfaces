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
    card.style.transition = "transform 0.7s ease";
    card.style.transform = "rotateY(180deg)";
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.boton-nivel');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const nivel = parseInt(button.textContent.split(' ')[0]);
            mostrarParejas(nivel);
        });
    });
});
/** Fin ----  Funciones para mostrar las imagenes segun nivel y que salgan barajadas **/
/******************************************************************************************************** */
/** Promesas para comenzar audio al hacer clic en start **/

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