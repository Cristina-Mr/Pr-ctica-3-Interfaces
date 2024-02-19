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

function mostrarParejas(numero) {
    const game = document.querySelector('.game');
    game.innerHTML = '';

    const selectedCards = cardsArray.slice(0, numero);

    const duplicatedCards = [...selectedCards, ...selectedCards];
    duplicatedCards.sort(() => Math.random() - 0.5);

    duplicatedCards.forEach((card, index) => {
        const img = document.createElement('img');
        img.src = card.img;
        img.alt = card.name;
        img.classList.add('clickable');
        game.appendChild(img);
    });
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